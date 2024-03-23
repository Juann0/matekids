const { app, BrowserWindow, screen, Notification } = require('electron');
const path = require('path');

//Traigo express

// app.disableHardwareAcceleration();

let mainWindow = null;

function main() {

    require('./index.js');
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        width,
        height,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            enableRemoteModule: true,
            webSecurity: false,
        }
    });
    // mainWindow.maximize();
    mainWindow.setMenu(null);
    mainWindow.loadURL('http://127.0.0.1:4000');
    // mainWindow.webContents.openDevTools();
    mainWindow.on('close', event => {
        mainWindow = null;
    });
    // mainWindow.maximize();
    app.setAppUserModelId("Matekids");

    app.on("browser-window-created", (e, win) => {
        win.removeMenu();
    });

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        main()
    }
})

app.on('ready', main);