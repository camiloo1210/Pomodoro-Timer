# Pomodoro Timer

A pixel-art style Pomodoro Timer designed for programmers, focused on health and productivity.

## Features
- **Background Timer**: Runs in a separate worker thread for accuracy even when minimized.
- **Pixel Art UI**: Custom pixel art animations for work, break, and idle states.
- **Health Tips**: Random health tips during breaks to keep you healthy.
- **System Notifications**: Native desktop notifications when the timer completes.
- **Sound Alerts**: Audio alert when the timer finishes.

## Installation Guide

Follow these steps to install the application on your Windows computer:

1.  **Navigate to the Build Folder**:
    Open your file explorer and go to the `dist` folder inside the project directory:
    `t:\Platanito\Pomodoro Timer\dist`

2.  **Locate the Installer**:
    Look for a file named `Pomodoro Timer Setup 0.0.0.exe`.

3.  **Run the Installer**:
    Double-click on `Pomodoro Timer Setup 0.0.0.exe`.
    *   *Note*: Windows might ask for permission or show a "SmartScreen" warning since this is a self-signed app. If this happens, click "More info" and then "Run anyway".

4.  **Wait for Installation**:
    The installation process is automatic and very quick. You might see a small loading window.

5.  **Launch the App**:
    Once installed, the application should open automatically.
    You can also find it later by searching for "Pomodoro Timer" in your Windows Start Menu.

6.  **Using the App**:
    - The app will appear in your system tray (bottom right corner, near the clock) as a small tomato icon.
    - You can close the main window to minimize it to the tray; the timer will keep running.
    - Right-click the tray icon to Quit the application completely.

## Linux Installation

To install on Linux:

1.  **Build the App**:
    You need to run the build command. If you are on Windows, you might need to use WSL (Windows Subsystem for Linux) or build it on a Linux machine.
    ```bash
    npm run electron:build -- --linux
    ```

2.  **Locate the Installer**:
    Go to the `dist` folder. You will find:
    - `.AppImage` file: Can be run directly (make it executable first: `chmod +x filename.AppImage`).
    - `.deb` file: Can be installed on Debian/Ubuntu based systems (`sudo dpkg -i filename.deb`).

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
