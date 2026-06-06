const bundle = {
  "com.meituan.imeituan": "美团",
  "com.apple.MobileSMS": "信息",
  "com.apple.weather": "天气",
  "com.apple.MobileAddressBook": "通讯录",
  "com.apple.mobilesafari": "Safari 浏览器",
  "com.apple.ShortcutsActions": "快捷指令操作扩展",
  "com.apple.mobilephone": "电话",
  "com.tencent.xin": "微信",
  "com.apple.mobileslideshow": "照片",
  "com.max.xiaoheihe": "小黑盒",
  "com.apple.Health": "健康",
  "com.apple.TestFlight": "TestFlight",
  "com.alipay.iphoneclient": "支付宝",
  "com.apple.camera": "相机",
  "com.apple.Translate": "翻译",
  "com.apple.Music": "音乐",
  "com.neo.DeviceMonitor": "Device Monitor",
  "com.apple.Passwords": "密码",
  "com.apple.Maps": "地图",
  "com.apple.DocumentsApp": "文件",
  "com.apple.games": "游戏中心",
  "com.bilibili.inter": "哔哩哔哩国际版",
  "com.atebits.Tweetie2": "X / Twitter",
  "com.apple.shortcuts": "快捷指令",
  "com.tencent.mqq": "QQ",
  "com.tencent.smoba": "王者荣耀",
  "com.google.gemini": "Google Gemini",
  "com.ss.iphone.ugc.Aweme": "抖音",
  "com.ss.iphone.article.News": "今日头条",
  "com.shanghaiqiangshu.Xiaohongshu": "小红书",
  "com.taobao.taobao4iphone": "淘宝",
  "com.jingdong.app.mall": "京东",
  "com.xunmeng.pinduoduo": "拼多多",
  "com.sina.weibo": "微博",
  "com.netease.cloudmusic": "网易云音乐",
  "com.tencent.live4iphone": "腾讯视频",
  "com.qiyi.iphone": "爱奇艺",
  "com.youku.YouKu": "优酷",
  "com.tencent.wemeet": "腾讯会议",
  "com.alibaba.DingTalk": "钉钉",
  "com.baidu.searchbox": "百度",
  "com.autonavi.amap": "高德地图",
  "com.ss.iphone.ugc.Feiliao": "剪映",
  "com.tencent.xin.pro": "微信分身/企业微信",
  "com.tencent.karaoke": "全民K歌",
  "com.ss.chime": "TikTok",
  "com.zhiliaoapp.musically": "TikTok (历史包名)",
  "com.facebook.Facebook": "Facebook",
  "com.banyantree.LinkedInIndia": "LinkedIn",
  "com.toyopagroup.picaboo": "Snapchat",
  "com.instagram.da": "Instagram",
  "com.bilibili.app.in": "哔哩哔哩 (国内版)",
  "com.microsoft.Office.Word": "Microsoft Word",
  "com.microsoft.Excel": "Microsoft Excel",
  "com.openai.chatgpt": "ChatGPT",
  "com.meituan.takeout": "美团外卖",
  "com.eleme.Inhouse": "饿了么",
  "com.didichuxing.pda": "滴滴出行",
  "com.didaglobal.pda": "嘀嗒出行",
  "com.chexiang.helloglobal": "哈啰",
  "com.tianya.trip": "携程旅行",
  "com.Qunar.InHouse.QunarAbnormal": "去哪儿旅行",
  "com.tongcheng.travel": "同程旅行",
  "com.zhihu.ios": "知乎",
  "com.douban.frodo": "豆瓣",
  "com.coolapk.market": "酷安",
  "com.hupu.shihuo": "识货",
  "com.hupu.games": "虎扑",
  "com.netease.vopen": "网易公开课",
  "com.netease.mail": "网易邮箱大师",
  "com.tencent.QQMail": "QQ邮箱",
  "com.kingsoft.www.office": "WPS Office",
  "com.tencent.mqqgame": "掌上英雄联盟",
  "com.tencent.tmgp.pubgmhd": "和平精英",
  "com.miHoYo.Yuanshen": "原神",
  "com.miHoYo.hkrpg": "崩坏：星穹铁道",
  "com.netease.g10": "阴阳师",
  "com.netease.cloudgame": "网易云游戏",
  "com.duowan.kiwi": "虎牙直播",
  "com.wanda.douyu": "斗鱼直播",
  "com.ximalaya.ting": "喜马拉雅",
  "com.tencent.QQMusic": "QQ音乐",
  "com.kugou.shoujibang": "酷狗音乐",
  "com.kuwo.player": "酷我音乐",
  "com.apple.store": "Apple Store",
  "com.apple.iBooks": "图书 (Apple Books)",
  "com.apple.podcasts": "播客 (Apple Podcasts)",
  "com.apple.Fitness": "健身 (Fitness)",
  "com.apple.Home": "家庭 (Home)",
  "com.apple.calculator": "计算器",
  "com.apple.reminders": "提醒事项",
  "com.apple.mobilenotes": "备忘录",
  "com.google.Drive": "Google Drive",
  "com.google.Gmail": "Gmail",
  "com.google.Maps": "Google Maps",
  "com.google.ios.youtube": "YouTube",
  "com.netflix.Netflix": "Netflix",
  "com.spotify.client": "Spotify",
  "com.valvesoftware.SteamKey": "Steam Mobile",
  "com.epicgames.EpicGamesStore": "Epic Games Store",
  "org.telegram.Telegram-iOS": "Telegram",
};
const fileInput = document.getElementById("fileInput");
const bundleInput = document.getElementById("bundleInput");
const startBtn = document.getElementById("startBtn");
const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const downloadLink = document.getElementById("downloadLink");
const outNameInput = document.getElementById("outName");
const clearBtn = document.getElementById("clearBtn");
const merge = document.getElementById("merge");
const onlyAppleBtn = document.getElementById("onlyApple");

let bundleList = ["选择应用列表"];

/**
 *
 * @param {string} line
 * @returns {void}
 */
function appendLog(line) {
  logEl.value += line + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

function isIPv4(domain) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Regex.test(domain);
}

function isIPv6(domain) {
  // 提取 / 之前的部分（支持带端口号或 CIDR 掩码的情况，去掉方括号）
  const ipv6Part = domain.split("/")[0].replace(/[\[\]]/g, "");
  // 社区标准的完整 IPv6 校验正则
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Regex.test(ipv6Part);
}

function isIP(domain) {
  return isIPv4(domain) || isIPv6(domain);
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
/**
 * 从 NDJSON 格式的隐私报告文本中提取所有不重复的 identifier 值
 * @param {string} ndjsonText - 整个 ndjson 文件的文本内容
 * @returns {string[]} 不重复的 identifier 数组
 */
function extractUniqueIdentifiers(ndjsonText) {
  // 使用 Set 结构来自动去重
  const uniqueIdentifiers = new Set();

  // 按行分割文本
  const lines = ndjsonText.split("\n");

  for (let line of lines) {
    // 去除两端空格
    line = line.trim();

    // 跳过空行
    if (!line) continue;

    try {
      // 解析当前行的 JSON 对象
      const record = JSON.parse(line);

      // 提取 accessor 对象中的应用标识符 identifier (如 com.apple.xxx)
      if (record.accessor && record.accessor.identifier) {
        uniqueIdentifiers.add(record.accessor.identifier);
      }
    } catch (error) {
      // 容错处理：如果某一行 JSON 格式非法，跳过并继续处理下一行
      console.warn("解析 JSON 行失败，已跳过:", line, error);
    }
  }

  // 将 Set 转换为普通数组返回
  return Array.from(uniqueIdentifiers);
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
          if (
            data.domain &&
            ((targetBundleID === "com.apple" &&
              data.bundleID?.startsWith("com.apple") &&
              data.bundleID !== "com.apple.mobilesafari") ||
              data.bundleID === targetBundleID)
          ) {
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
        if (
          data.domain &&
          ((targetBundleID === "com.apple" &&
            data.bundleID?.startsWith("com.apple") &&
            data.bundleID !== "com.apple.mobilesafari") ||
            data.bundleID === targetBundleID)
        ) {
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

  // 将域名和 IP 分开处理，保证域名使用 DOMAIN，IPv4 使用 IP-CIDR，并对 IPv4 做 /24 聚合，IPv6 使用 IP-CIDR6
  const ipv4s = sorted.filter((s) => isIPv4(s));
  const ipv6s = sorted.filter((s) => isIPv6(s));
  const domains = sorted.filter((s) => !isIP(s));
  const aggregatedIPv4 = aggregateIPsTo24(ipv4s);

  const outputLines = [];
  for (const d of domains) outputLines.push(`DOMAIN, ${d}`);
  for (const ipv4 of aggregatedIPv4)
    outputLines.push(`IP-CIDR, ${ipv4}, no-resolve`);
  for (const ipv6 of ipv6s) outputLines.push(`IP-CIDR6, ${ipv6}, no-resolve`);

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
    appendLog("前 100 条示例:");
    for (let i = 0; i < Math.min(100, outputLines.length); i++)
      appendLog(outputLines[i]);
  } else {
    appendLog("未找到匹配记录");
  }
}

fileInput.addEventListener("input", (event) => {
  const file = event.target.files[0];
  file
    .text()
    .then((text) => {
      // 当文件读取成功后，调用提取函数
      const uniqueIDs = extractUniqueIdentifiers(text);
      bundleInput.innerHTML = "";
      for (let id of uniqueIDs) {
        if (bundle[id]) {
          let option = new Option(bundle[id], id);
          bundleInput.add(option);
        } else {
          let option = new Option(id, id);
          bundleInput.add(option);
        }
        bundleList.push(id);
        onlyApple.removeAttribute("disabled");
        onlyApple.parentElement.classList.remove("text-gray-300");
      }
    })
    .catch((err) => {
      console.error("读取文件失败：", err);
      alert("读取文件失败，请重试");
    });
});

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
  downloadLink.style.display = "none";
  statusEl.textContent = "已清空";
});

onlyAppleBtn.addEventListener("change", (event) => {
  if (event.target.checked) {
    bundleInput.setAttribute("disabled", "");
    let option = new Option("Apple系应用", "com.apple", true, true);
    bundleInput.add(option);
  } else {
    bundleInput.removeAttribute("disabled");
    bundleInput.lastElementChild.remove();
  }
});
