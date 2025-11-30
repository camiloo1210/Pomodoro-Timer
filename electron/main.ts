import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import fs from 'fs';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(os.homedir(), 'pomodoro-debug.log');

function log(message: string) {
    try {
        fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`);
    } catch (e) {
        console.error('Failed to write log:', e);
    }
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
    log('Creating window...');
    mainWindow = new BrowserWindow({
        width: 500,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, '../public/assets/tomato_idle.png'),
        autoHideMenuBar: true,
        resizable: false,
    });

    if (isDev) {
        log('Loading dev URL');
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        log(`Current __dirname: ${__dirname}`);
        log(`Current process.resourcesPath: ${process.resourcesPath}`);
        log(`Current app.getAppPath(): ${app.getAppPath()}`);

        try {
            const rootContents = fs.readdirSync(app.getAppPath());
            log(`Contents of app path: ${rootContents.join(', ')}`);
        } catch (e) {
            log(`Error listing app path: ${e}`);
        }

        // Try to find the file
        const possiblePaths = [
            path.join(__dirname, '../dist/index.html'),
            path.join(process.resourcesPath, 'app/dist/index.html'),
            path.join(app.getAppPath(), 'dist/index.html')
        ];

        let loaded = false;
        for (const p of possiblePaths) {
            log(`Checking path: ${p}`);
            if (fs.existsSync(p)) {
                log(`Found index.html at: ${p}`);
                mainWindow.loadFile(p);
                loaded = true;
                break;
            }
        }

        if (!loaded) {
            log('Could not find index.html in any expected location.');
            // Fallback to a simple error message
            mainWindow.loadURL(`data:text/html;charset=utf-8,
        <html>
          <body>
            <h1>Error: Could not load application</h1>
            <p>Please check the log file at ${logPath}</p>
          </body>
        </html>
      `);
        }
    }

    mainWindow.on('close', (event) => {
        if (!app.isQuitting) {
            event.preventDefault();
            mainWindow?.hide();
        }
        return false;
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        log(`Failed to load: ${errorDescription} (${errorCode})`);
    });
}

function createTray() {
    const iconPath = path.join(__dirname, isDev ? '../public/assets/tomato_idle.png' : '../dist/assets/tomato_idle.png');
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow?.show() },
        {
            label: 'Quit', click: () => {
                app.isQuitting = true;
                app.quit();
            }
        },
    ]);

    tray.setToolTip('Pixel Pomodoro');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow?.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // We don't quit here because we want to stay in tray
    }
});

// Custom property to track quitting
declare global {
    namespace Electron {
        interface App {
            isQuitting: boolean;
        }
    }
}
app.isQuitting = false;
