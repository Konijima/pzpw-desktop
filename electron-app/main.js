// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut } = require('electron');
const { join } = require('path');
const url = require('url');

// Initialize ipcMain
require('./ipc');

let mainWindow;

function onClosed() {
  mainWindow = null;
}

function toggleDevTools() {
  mainWindow.webContents.toggleDevTools();
}

function createWindow () {
  if (mainWindow && !mainWindow.isFocused()) return;

  if (mainWindow) {
    mainWindow.off("closed", onClosed);
    mainWindow.close();
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    maximizable: true,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js")
    }
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(
    url.format({
      pathname: join(__dirname, `app/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  globalShortcut.register('F6', toggleDevTools);
  globalShortcut.register('F5', createWindow);
  globalShortcut.register('CommandOrControl+R', createWindow);
  mainWindow.once('beforeunload', () => {
    globalShortcut.unregister('F6', toggleDevTools);
    globalShortcut.unregister('F5', createWindow);
    globalShortcut.unregister('CommandOrControl+R', createWindow);
  });

  mainWindow.on("closed", onClosed);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
