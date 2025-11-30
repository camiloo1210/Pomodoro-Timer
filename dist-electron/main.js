import d, { app as n, BrowserWindow as h, nativeImage as g, Tray as w, Menu as P } from "electron";
import r from "path";
import { fileURLToPath as b } from "url";
import c from "fs";
import y from "os";
if (typeof d == "string")
  throw new TypeError("Not running in an Electron environment!");
const { env: m } = process, C = "ELECTRON_IS_DEV" in m, $ = Number.parseInt(m.ELECTRON_IS_DEV, 10) === 1, u = C ? $ : !d.app.isPackaged, _ = b(import.meta.url), l = r.dirname(_), f = r.join(y.homedir(), "pomodoro-debug.log");
function e(i) {
  try {
    c.appendFileSync(f, `${(/* @__PURE__ */ new Date()).toISOString()} - ${i}
`);
  } catch (a) {
    console.error("Failed to write log:", a);
  }
}
let o = null, s = null;
function p() {
  if (e("Creating window..."), o = new h({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    },
    icon: r.join(l, "../public/assets/tomato_idle.png"),
    autoHideMenuBar: !0,
    resizable: !1
  }), u)
    e("Loading dev URL"), o.loadURL("http://localhost:5173"), o.webContents.openDevTools();
  else {
    e(`Current __dirname: ${l}`), e(`Current process.resourcesPath: ${process.resourcesPath}`), e(`Current app.getAppPath(): ${n.getAppPath()}`);
    try {
      const t = c.readdirSync(n.getAppPath());
      e(`Contents of app path: ${t.join(", ")}`);
    } catch (t) {
      e(`Error listing app path: ${t}`);
    }
    const i = [
      r.join(l, "../dist/index.html"),
      r.join(process.resourcesPath, "app/dist/index.html"),
      r.join(n.getAppPath(), "dist/index.html")
    ];
    let a = !1;
    for (const t of i)
      if (e(`Checking path: ${t}`), c.existsSync(t)) {
        e(`Found index.html at: ${t}`), o.loadFile(t), a = !0;
        break;
      }
    a || (e("Could not find index.html in any expected location."), o.loadURL(`data:text/html;charset=utf-8,
        <html>
          <body>
            <h1>Error: Could not load application</h1>
            <p>Please check the log file at ${f}</p>
          </body>
        </html>
      `));
  }
  o.on("close", (i) => (n.isQuitting || (i.preventDefault(), o?.hide()), !1)), o.webContents.on("did-fail-load", (i, a, t) => {
    e(`Failed to load: ${t} (${a})`);
  });
}
function x() {
  const i = r.join(l, u ? "../public/assets/tomato_idle.png" : "../dist/assets/tomato_idle.png"), a = g.createFromPath(i);
  s = new w(a);
  const t = P.buildFromTemplate([
    { label: "Show App", click: () => o?.show() },
    {
      label: "Quit",
      click: () => {
        n.isQuitting = !0, n.quit();
      }
    }
  ]);
  s.setToolTip("Pixel Pomodoro"), s.setContextMenu(t), s.on("click", () => {
    o?.show();
  });
}
n.whenReady().then(() => {
  p(), x(), n.on("activate", () => {
    h.getAllWindows().length === 0 && p();
  });
});
n.on("window-all-closed", () => {
  process.platform;
});
n.isQuitting = !1;
