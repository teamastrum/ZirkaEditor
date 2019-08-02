// Electron
const electron = require('electron');

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

// More electron stuff
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');
const Menu = electron.Menu;

// IPC
var ipc = electron.ipcMain;

// Required
const editor = require('./editor/editor');
const files = require('./editor/files');

function createWindow() {
    // Create a new BrowserWindow
    let win = new BrowserWindow({
        width: 500,
        height: 300,
        webPreferences: {
            show: false,
            nodeIntegration: true
        }
    });

    // Load index.html (Start Page)
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/files/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open Dev Tools
    // win.webContents.openDevTools();

    // If window is ready to show
    win.on('ready-to-show', () => {
        // then show it
        win.show();
    });

    // If window is closed
    win.on('closed', () => {
        // Set it to null
        win = null;
        win2 = null;
        app.quit();
    });

    // Create a new BrowserWindow
    let win2 = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            show: false,
            nodeIntegration: true
        }
    });

    // Load index.html (Start Page)
    win2.loadURL(url.format({
        pathname: path.join(__dirname, '/files/html/editor.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open Dev Tools
    win2.webContents.openDevTools();

    win2.on('show', () => {
        win2.maximize();
    });

    // If window is closed
    win2.on('closed', () => {
        // Set it to null
        win = null;
        win2 = null;
        app.quit();
    });

    ipc.on('showEditor', () => {
        win2.show();
        win.hide();
        setMenuBar();
    });

    win2.hide();
}

// If app is ready
app.on('ready', () => {
    // Create the window
    createWindow();

    // Set menu to null
    Menu.setApplicationMenu(null);
    
    // To be removed when ctual editor added.
    //setMenuBar();
});

function setMenuBar() {
    // The actual menu for the editor.
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click: () => {
                        files.saveFile(editor.getCurrentlyOpenedFile().filePath);
                    },
                    accelerator: 'CmdOrCtrl + S'
                },
                {
                    label: 'Save As',
                    click: () => {
                        files.saveAsFile();
                    },
                    accelerator: 'CmdOrCtrl + Shift + S'
                },
                {
                    label: 'Open',
                    click: () => {
                        files.open();
                    },
                    accelerator: 'CmdOrCtrl + O'
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        }
    ];

    // Set the menu.
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.on('window-all-closed', () => {
    // When all windows are closed
    if (process.platform !== 'darwin') { // and the platform is not darwin
        // then quit the app
        app.quit();
    }
});

// When activated
app.on('activate', () => {
    if (win == null) { // and win is not null
        // then create the window
        createWindow();
    }
});
