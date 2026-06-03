// 流量消耗
let maxtheard;
let testurl;
let thread_down = [];
let all_down_sum = 0;
let run = false;
let Maximum;
let times = 0;
let lsat_date;
let lsat_all_down = 0;

let consume = document.getElementById("consume");
let current_speed = document.getElementById("current-speed");
let active_threads = document.getElementById("active-threads");
let run_time = document.getElementById("run-time");

setInterval(delay, 1000);

document.getElementById("do").addEventListener("click", () => {
  maxtheard = document.getElementById("threads").value;
  testurl = document.getElementById("link").value;
  Maximum = document.getElementById("max-consume").value * 1024 * 1024;
  active_threads.innerText = maxtheard;
  if (run) {
    stop();
  } else {
    start();
  }
});

// 从控制台获取延迟
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "resource") {
      if (entry.name == "https://cp.cloudflare.com/generate_204") {
        document.getElementById("delay-gb").innerText =
          Math.floor(entry.duration) + " ms";
      }
      if (
        entry.name ==
        "https://connectivitycheck.platform.hicloud.com/generate_204"
      ) {
        document.getElementById("delay-cn").innerText =
          Math.floor(entry.duration) + " ms";
      }
      // 这里可以做性能上报、监控等
    }
  });
});
observer.observe({ type: "resource", buffered: true });

// 1. 测试链接
function delay() {
  const testOptions = {
    method: "HEAD",
    mode: "no-cors",
    cache: "no-cache", // 确保每次都是真实网络请求
    credentials: "omit",
  };
  // 1. 测试连通性
  fetch(
    "https://connectivitycheck.platform.hicloud.com/generate_204",
    testOptions,
  ).catch((err) => console.log(" 节点异常:", err));

  // 2. 测试 Cloudflare 连通性
  fetch("https://cp.cloudflare.com/generate_204", testOptions).catch((err) =>
    console.error("CF 节点异常:", err),
  );
}

// 1. 获取ip
function local() {
  let requestOptions = {
    method: "GET",
    referrerPolicy: "no-referrer",
  };

  fetch("https://api-ipv4.ip.sb/geoip", { referrerPolicy: "no-referrer" })
    .then((response) => response.json())
    .then((data) => {
      let tag = document.getElementById("gb");
      tag.innerHTML = data.ip + "<p></p>" + data.country;
    });
  fetch("https://openapi.lddgo.net/base/gtool/api/v1/GetIp", {
    referrerPolicy: "no-referrer",
  })
    .then((response) => response.json())
    .then((data) => {
      let tag = document.getElementById("cn");
      tag.innerHTML = data.data.ip + "<p></p>" + "China";
    });
}
local();

function show(num, des, flo) {
  let cnum = num;
  let total_index = 0;
  while (cnum >= 1024) {
    if (total_index == des.length - 1) break;
    cnum = cnum / 1024;
    total_index++;
  }
  return cnum.toFixed(flo[total_index]) + des[total_index];
}
function sum(arr) {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    s += arr[i];
  }
  return s;
}

async function total() {
  let all_down = sum(thread_down);
  let r = show(
    all_down_sum + all_down,
    ["B", "KB", "MB", "GB", "TB", "PB"],
    [0, 0, 2, 3, 2, 2],
  );
  document.getElementById("consume").innerText = r;

  if (Maximum && all_down > Maximum) {
    stop();
  }
  if (run) setTimeout(total, 100);
  else {
    all_down_sum += all_down;
    document.getElementById("consume").innerText = show(
      all_down_sum,
      ["B", "KB", "MB", "GB", "TB", "PB"],
      [0, 0, 2, 3, 2, 2],
    );
  }
}
async function time() {
  if (run) {
    times++;
    run_time.innerText = times;
    setTimeout(time, 1000);
  }
}
async function start() {
  document.getElementById("do").innerText = "正在检验链接...";
  if (!checkURL(testurl)) {
    alert("链接不合法");
    return;
  }
  try {
    const response = await fetch(testurl, {
      cache: "no-store",
      mode: "cors",
      referrerPolicy: "no-referrer",
    });
    const reader = response.body.getReader();
    const { value, done } = await reader.read();
    if (value.length <= 0) throw "资源响应异常";
    reader.cancel();
  } catch (err) {
    console.warn(err);
    document.getElementById("do").innerText = "开始";
    document.getElementById("do").disabled = false;
    alert(
      "该链接不可用，如果你能够正常访问该链接，那么很有可能是浏览器的跨域限制",
    );
    return;
  }
  run = true;
  while (maxtheard--) {
    thread_down[maxtheard] = 0;
    start_thread(maxtheard);
  }
  document.getElementById("do").innerHTML = `
                <svg class="ico w-6 h-6" aria-hidden="true">
                  <use id="ico-button" xlink:href="#icon-zanting"></use>
                </svg>
                <span> 停止 </span>`;
  time();
  cale();
  total();
}

function stop() {
  run = false;
  document.getElementById("do").innerHTML = `
                <svg class="ico w-6 h-6" aria-hidden="true">
                  <use id="ico-button" xlink:href="#icon-daochu1024-15"></use>
                </svg>
                <span> 开启 </span>`;
}

async function start_thread(index) {
  try {
    const response = await fetch(testurl, {
      cache: "no-store",
      mode: "cors",
      referrerPolicy: "no-referrer",
    });
    const reader = response.body.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.cancel();
        start_thread(index);
        break;
      }
      if (!run) {
        reader.cancel();
        break;
      }
      thread_down[index] += value.length;
    }
  } catch (err) {
    console.log(err);
    if (run) start_thread(index);
  }
}
function checkURL(URL) {
  var str = URL;
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) == true) {
    return true;
  } else {
    return false;
  }
}

async function cale() {
  var all_down_a = sum(thread_down);
  // now_speed =
  //   (((all_down_a - lsat_all_down) / (new Date().getTime() - lsat_date)) *
  //     1000) /
  //   1024 /
  //   1024;

  document.getElementById("current-speed").innerText = show(
    all_down_a - lsat_all_down,
    ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s"],
    [0, 0, 2, 3, 6, 2],
  );
  let avg = all_down_a - lsat_all_down;
  lsat_all_down = all_down_a;
  lsat_date = new Date().getTime();
  if (run) setTimeout(cale, 1000);
  document.getElementById("current-speed").innerText = show(
    avg,
    ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s"],
    [0, 0, 2, 3, 6, 2],
  );
}
