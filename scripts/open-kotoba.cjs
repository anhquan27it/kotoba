// Windows folder launcher. Uses only Node's built-in modules.
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const net = require("node:net");
const { spawn, execFile } = require("node:child_process");
const { promisify } = require("node:util");
const { createInterface } = require("node:readline/promises");
const execute = promisify(execFile);
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = portIndex < 0 ? 3000 : Number(args[portIndex + 1]);
if (!Number.isInteger(port) || port < 1024 || port > 65535)
  throw new Error("Invalid local port");
const url = `http://127.0.0.1:${port}`;
const runtime = path.join(root, ".kotoba");
const recordFile = path.join(runtime, `server-${port}.json`);
const lockFile = path.join(runtime, `launch-${port}.lock`);
const resultFile = path.join(runtime, `result-${port}.txt`);
const logFile = path.join(runtime, `server-${port}.log`);
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
fs.mkdirSync(runtime, { recursive: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function healthy() {
  return new Promise((resolve) => {
    const request = http.get(url, { timeout: 2000 }, (response) => {
      let text = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        if (text.length < 2_000_000) text += chunk;
      });
      response.on("end", () =>
        resolve(
          response.statusCode === 200 &&
            /<title>[^<]*Kotoba[^<]*<\/title>/u.test(text),
        ),
      );
      response.on("error", () => resolve(false));
    });
    request.on("timeout", () => request.destroy());
    request.on("error", () => resolve(false));
  });
}

function isAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function buildNeeded() {
  const built = path.join(root, ".next", "BUILD_ID");
  if (!fs.existsSync(built)) return true;
  const builtAt = fs.statSync(built).mtimeMs;
  function newer(filename) {
    const stats = fs.statSync(filename);
    if (!stats.isDirectory()) return stats.mtimeMs > builtAt;
    return fs
      .readdirSync(filename)
      .some((name) => newer(path.join(filename, name)));
  }
  return [
    "app",
    "components",
    "lib",
    "data",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "tsconfig.json",
  ].some((name) => {
    const filename = path.join(root, name);
    return fs.existsSync(filename) && newer(filename);
  });
}

async function processInfo(pid) {
  const command = `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $p = Get-Process -Id ${pid} -ErrorAction SilentlyContinue; if ($p) { @{ executable = $p.Path; startTicks = $p.StartTime.ToUniversalTime().Ticks.ToString() } | ConvertTo-Json -Compress }`;
  const { stdout } = await execute(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", command],
    { windowsHide: true, timeout: 15000 },
  );
  if (!stdout.trim()) return;
  return JSON.parse(stdout.replace(/^\uFEFF/, ""));
}

async function ownedServer() {
  if (!fs.existsSync(recordFile)) return;
  const record = JSON.parse(fs.readFileSync(recordFile, "utf8"));
  if (!isAlive(record.pid) || record.root !== root || !record.startTicks)
    return;
  // Compare the exact process creation time captured when this launcher spawned it.
  // Matching a PID alone could accidentally stop a later, unrelated Node process.
  const info = await processInfo(record.pid);
  if (!info) return;
  const normalize = (value) => value.toLowerCase().replaceAll("/", "\\");
  if (
    normalize(info.executable || "") !== normalize(process.execPath) ||
    info.startTicks !== record.startTicks
  )
    return;
  return record;
}

async function stop() {
  if (fs.existsSync(lockFile)) {
    const owner = JSON.parse(fs.readFileSync(lockFile, "utf8"));
    if (owner.pid !== process.pid && isAlive(owner.pid))
      throw new Error(
        "Kotoba đang chuẩn bị bản học. Hãy đợi web mở xong rồi nhấp Dừng Kotoba.",
      );
  }
  const record = await ownedServer();
  if (!record) {
    if (await healthy())
      throw new Error(
        "Web đang chạy từ một cửa sổ khác. Hãy dừng ở cửa sổ đã mở web; nút này chỉ dừng web do Mở Kotoba khởi chạy.",
      );
    return "Kotoba đã dừng.";
  }
  process.kill(record.pid);
  for (let n = 0; n < 40 && isAlive(record.pid); n++) await delay(100);
  if (isAlive(record.pid))
    throw new Error("Chưa dừng được Kotoba. Vui lòng thử lại.");
  fs.unlinkSync(recordFile);
  return "Đã dừng Kotoba. Tiến độ học vẫn được giữ trong trình duyệt.";
}

async function portAvailable() {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => server.close(() => resolve(true)));
  });
}

function runNode(script, argumentsList = []) {
  const log = fs.openSync(logFile, "a");
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...argumentsList], {
      cwd: root,
      windowsHide: true,
      stdio: ["ignore", log, log],
    });
    fs.closeSync(log);
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0
        ? resolve()
        : reject(
            new Error(`Chuẩn bị web thất bại. Xem chi tiết tại ${logFile}`),
          ),
    );
  });
}

async function openBrowser() {
  if (args.includes("--no-open")) return;
  await execute("rundll32.exe", ["url.dll,FileProtocolHandler", url], {
    windowsHide: true,
  });
}

async function start() {
  if (!fs.existsSync(nextCli))
    throw new Error(
      "Chưa có thư viện của web. Mở terminal trong folder, chạy npm install rồi nhấp Mở Kotoba lại.",
    );
  if ((await healthy()) && !buildNeeded()) {
    await openBrowser();
    return "Kotoba đang chạy.";
  }
  // Serialize builds and launches when the shortcut is clicked repeatedly.
  let lock;
  for (let n = 0; n < 240; n++) {
    try {
      lock = fs.openSync(lockFile, "wx");
      break;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      let owner;
      try {
        owner = JSON.parse(fs.readFileSync(lockFile, "utf8"));
      } catch {
        /* A just-created lock may not be written yet. */
      }
      if (owner && !isAlive(owner.pid)) {
        fs.unlinkSync(lockFile);
        continue;
      }
      if ((await healthy()) && !buildNeeded()) {
        await openBrowser();
        return "Kotoba đang chạy.";
      }
      await delay(1000);
    }
  }
  if (lock === undefined)
    throw new Error(
      "Kotoba đang chuẩn bị lâu hơn dự kiến. Xem nhật ký trong folder .kotoba rồi thử lại.",
    );
  fs.writeFileSync(lock, JSON.stringify({ pid: process.pid }));
  fs.closeSync(lock);
  try {
    if (await healthy()) {
      if (!buildNeeded()) {
        await openBrowser();
        return "Kotoba đang chạy.";
      }
      await stop();
    }
    if (!(await portAvailable()))
      throw new Error(
        `Cổng ${port} đang được ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi mở Kotoba lại.`,
      );
    if (buildNeeded()) {
      await runNode(path.join(__dirname, "generate-readings.cjs"));
      await runNode(nextCli, ["build", root]);
    }
    const log = fs.openSync(logFile, "a");
    const startedAt = Date.now();
    const child = spawn(
      process.execPath,
      [
        nextCli,
        "start",
        root,
        "--hostname",
        "127.0.0.1",
        "--port",
        String(port),
      ],
      {
        cwd: root,
        windowsHide: true,
        detached: true,
        stdio: ["ignore", log, log],
      },
    );
    fs.closeSync(log);
    await new Promise((resolve, reject) => {
      child.once("spawn", resolve);
      child.once("error", reject);
    });
    const info = await processInfo(child.pid);
    if (!info?.startTicks) {
      child.kill();
      throw new Error(
        "Không lưu được thông tin máy chủ Kotoba. Vui lòng mở lại.",
      );
    }
    fs.writeFileSync(
      recordFile,
      JSON.stringify({
        pid: child.pid,
        startedAt,
        startTicks: info.startTicks,
        root,
        port,
      }),
    );
    child.unref();
    for (let n = 0; n < 60; n++) {
      if (await healthy()) {
        await openBrowser();
        return "Đã mở Kotoba.";
      }
      if (!isAlive(child.pid)) break;
      await delay(500);
    }
    throw new Error(`Kotoba chưa khởi động được. Xem chi tiết tại ${logFile}`);
  } finally {
    fs.unlinkSync(lockFile);
  }
}

(async () => {
  if (args.includes("--shortcut"))
    console.log(
      args.includes("--stop") ? "Đang dừng Kotoba…" : "Đang mở Kotoba…",
    );
  try {
    const message = await (args.includes("--stop") ? stop() : start());
    fs.writeFileSync(resultFile, message, "utf8");
    console.log(message);
  } catch (error) {
    fs.writeFileSync(resultFile, error.message, "utf8");
    console.error(error.message);
    process.exitCode = 1;
    // Keep an error readable when the launcher was opened by double-clicking.
    if (args.includes("--shortcut") && process.stdin.isTTY) {
      const prompt = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      await prompt.question("\nNhấn Enter để đóng cửa sổ.");
      prompt.close();
    }
  }
})();
