const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "kotoba-links-"));
const quote = (value) => "'" + value.replaceAll("'", "''") + "'";
// Launch the installed Node executable directly. An unsigned VBScript wrapper
// may be rejected by Windows Smart App Control before Node ever starts.
const script = `
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$launcherRoot = ${quote(root)}
$shortcutDirectory = ${quote(temporary)}
$shortcutShell = New-Object -ComObject WScript.Shell
$launcher = Join-Path $launcherRoot 'scripts\\open-kotoba.cjs'
$runner = ${quote(process.execPath)}
$icon = Join-Path $launcherRoot 'scripts\\kotoba.ico'
foreach ($action in @(@{ Name = 'Mo Kotoba'; Mode = ''; Note = 'Mở góc học tiếng Nhật' }, @{ Name = 'Dung Kotoba'; Mode = ' --stop'; Note = 'Dừng máy chủ Kotoba, giữ tiến độ học' })) {
  $shortcut = $shortcutShell.CreateShortcut((Join-Path $shortcutDirectory ($action.Name + '.lnk')))
  $shortcut.TargetPath = $runner
  $shortcut.Arguments = '"' + $launcher + '" --shortcut' + $action.Mode
  $shortcut.WorkingDirectory = $launcherRoot
  $shortcut.IconLocation = $icon + ',0'
  $shortcut.Description = $action.Note
  $shortcut.WindowStyle = 1
  $shortcut.Save()
}
`;
try {
  execFileSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-NonInteractive",
      "-EncodedCommand",
      Buffer.from(script, "utf16le").toString("base64"),
    ],
    { windowsHide: true, stdio: "pipe" },
  );
  for (const [filename, label] of [
    ["Mo Kotoba.lnk", "Mở Kotoba.lnk"],
    ["Dung Kotoba.lnk", "Dừng Kotoba.lnk"],
  ]) {
    fs.copyFileSync(path.join(temporary, filename), path.join(root, label));
  }
  console.log("Đã tạo Mở Kotoba.lnk và Dừng Kotoba.lnk trong folder dự án.");
} finally {
  for (const name of ["Mo Kotoba.lnk", "Dung Kotoba.lnk"]) {
    const filename = path.join(temporary, name);
    if (fs.existsSync(filename)) fs.unlinkSync(filename);
  }
  fs.rmdirSync(temporary);
}
