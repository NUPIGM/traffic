const fileInput = document.getElementById("fileInput");
const bundleInput = document.getElementById("bundleInput");
const startBtn = document.getElementById("startBtn");
const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const downloadLink = document.getElementById("downloadLink");
const outNameInput = document.getElementById("outName");
const clearBtn = document.getElementById("clearBtn");

function appendLog(line) {
  logEl.value += line + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

function isIP(domain) {
  if (/[a-zA-Z]/.test(domain)) return false;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
  return ipv4Regex.test(domain) || ipv6Regex.test(domain);
}
// 将 IPv4 地址按前三位分组，如果某组数量大于 2 则合并为 /24
function aggregateIPsTo24(ipArray) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const prefixMap = Object.create(null);
  const others = [];

  for (const ip of ipArray) {
    if (ipv4Regex.test(ip)) {
      const parts = ip.split(".");
      const prefix = parts.slice(0, 3).join(".");
      if (!prefixMap[prefix]) prefixMap[prefix] = [];
      prefixMap[prefix].push(ip);
    } else {
      // 非 IPv4（例如 IPv6），保留原样
      others.push(ip);
    }
  }

  const result = [];
  for (const prefix of Object.keys(prefixMap).sort()) {
    const arr = prefixMap[prefix];
    if (arr.length > 2) {
      result.push(`${prefix}.0/24`);
    } else {
      arr.sort((a, b) => a.localeCompare(b));
      for (const ip of arr) result.push(ip);
    }
  }

  return result.concat(others.sort());
}

async function processFile(file, targetBundleID) {
  appendLog(`开始处理：${file.name}`);
  statusEl.textContent = `正在筛选 bundleID: "${targetBundleID}"`;

  const unique = new Set();
  let lineCount = 0;
  let matchedCount = 0;

  // 尝试使用流（现代浏览器支持）
  if (file.stream) {
    const reader = file.stream().getReader();
    const decoder = new TextDecoder("utf-8");
    let { value: chunk, done } = await reader.read();
    let buf = "";

    while (!done) {
      buf += decoder.decode(chunk, { stream: true });
      const parts = buf.split(/\r?\n/);
      buf = parts.pop();

      for (const line of parts) {
        lineCount++;
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.bundleID === targetBundleID && data.domain) {
            unique.add(data.domain.trim());
            matchedCount++;
          }
        } catch (e) {
          /* 忽略 */
        }
      }

      if (lineCount % 2000 === 0) {
        statusEl.textContent = `已读取 ${lineCount} 行，已匹配 ${unique.size} 个域名`;
      }

      ({ value: chunk, done } = await reader.read());
    }

    // 处理残留 buf
    if (buf) {
      try {
        lineCount++;
        const data = JSON.parse(buf);
        if (data.bundleID === targetBundleID && data.domain) {
          unique.add(data.domain.trim());
        }
      } catch (e) {
        /* 忽略 */
      }
    }
  } else {
    // 回退：一次性读取（大文件可能会占用大量内存）
    appendLog(
      "当前浏览器不支持文件流式读取，正在一次性加载整个文件（内存风险）...",
    );
    const text = await file.text();
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      lineCount++;
      if (!line.trim()) continue;
      try {
        const data = JSON.parse(line);
        if (data.bundleID === targetBundleID && data.domain) {
          unique.add(data.domain.trim());
        }
      } catch (e) {}
    }
  }

  statusEl.textContent = `完成：共读取 ${lineCount} 行，提取 ${unique.size} 个不重复记录`;
  appendLog(statusEl.textContent);

  const sorted = Array.from(unique).sort();

  // 将域名和 IP 分开处理，保证域名使用 DOMAIN, ip 使用 IP-CIDR, 并对 IPv4 做 /24 聚合
  const ips = sorted.filter((s) => isIP(s));
  const domains = sorted.filter((s) => !isIP(s));
  const aggregatedIPs = aggregateIPsTo24(ips);

  const outputLines = [];
  for (const d of domains) outputLines.push(`DOMAIN, ${d}`);
  for (const ipOrPrefix of aggregatedIPs)
    outputLines.push(`IP-CIDR, ${ipOrPrefix}`);

  const blob = new Blob(
    [outputLines.join("\n") + (outputLines.length ? "\n" : "")],
    { type: "text/plain;charset=utf-8" },
  );
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = outNameInput.value || "output.txt";
  downloadLink.textContent = `下载 ${outNameInput.value || "output.txt"} (${outputLines.length} 条)`;
  downloadLink.style.display = "inline-block";

  if (outputLines.length > 0) {
    appendLog("前 50 条示例:");
    for (let i = 0; i < Math.min(50, outputLines.length); i++)
      appendLog(outputLines[i]);
  } else {
    appendLog("未找到匹配记录");
  }
}

startBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("请先选择输入文件");
    return;
  }
  const bundleID = bundleInput.value.trim();
  if (!bundleID) {
    alert("请输入 bundleID");
    return;
  }
  downloadLink.style.display = "none";
  logEl.value = "";
  await processFile(file, bundleID);
});

clearBtn.addEventListener("click", () => {
  logEl.value = "";
  bundleInput.value = "";
  downloadLink.style.display = "none";
  statusEl.textContent = "已清空";
});
