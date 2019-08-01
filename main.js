const electron = require('electron');

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

// Create basic electron stuff
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');
const Menu = electron.Menu;

// We need theese files
const editor = require('./editor/editor');
const files = require('./editor/files');

function createWindow() {
    // Creates window
    let win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            show: false,
            nodeIntegration: true
        }
    });

    // Set the url to the path of index.html (Start Page)
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/files/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open Dev Tools 
    win.webContents.openDevTools();

    win.on('ready-to-show', () => {
        // If is ready, show the app.
        win.show();
    });

    win.on('closed', () => {
        // When closed, set win to null
        win = null;
    });

}

app.on('ready', () => {
    // When ready, create window
    createWindow();

    // Remove default menu bar
    Menu.setApplicationMenu(null);
    // This will be removed once starting on the editor itself.
    setMenuBar();
});

function setMenuBar() {
    // The menu bar of the editor.
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click: () => {
                        files.saveFile(editor.getCurrentFile().filePath);
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

    // Set the new menu bar.
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.on('window-all-closed', () => {
    // If all windows are closed and the current platform isn't darwin,
    if (process.platform !== 'darwin') {
        // quit the app.
        app.quit();
    }
});

app.on('activate', () => {
    // On actiavted,
    if (win == null) { // /If win == null
        // then create it.
        createWindow();
    }
});
