// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function onClosed() {
  mainWindow = null;
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
    center: true,
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `app/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  globalShortcut.register('F5', createWindow);
  globalShortcut.register('CommandOrControl+R', createWindow);
  mainWindow.once('beforeunload', () => {
    globalShortcut.unregister('F5', createWindow);
    globalShortcut.unregister('CommandOrControl+R', createWindow);
  });

  mainWindow.webContents.openDevTools({
    mode: 'detach'
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
