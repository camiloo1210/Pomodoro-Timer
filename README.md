# Pomodoro Timer

A pixel-art style Pomodoro Timer designed for programmers, focused on health and productivity.

## Features
- **Background Timer**: Runs in a separate worker thread for accuracy even when minimized.
- **Pixel Art UI**: Custom pixel art animations for work, break, and idle states.
- **Health Tips**: Random health tips during breaks to keep you healthy.
- **System Notifications**: Native desktop notifications when the timer completes.
- **Sound Alerts**: Audio alert when the timer finishes.

## Installation

1.  Locate the installer file: `dist/Pomodoro Timer Setup 0.0.0.exe` (or similar).
2.  Double-click the installer to run it.
3.  The app will install and launch automatically.
4.  You can find the app in your Start Menu as "Pomodoro Timer".
5.  The app runs in the system tray. Closing the window will minimize it to the tray. To quit, right-click the tray icon and select "Quit".

## Development

To run the app in development mode:

```bash
npm install
npm run electron:dev
```

To build the installer:

```bash
npm run electron:build
```
