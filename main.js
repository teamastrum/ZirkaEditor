const electron = require('electron');

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');
const Menu = electron.Menu;

const editor = require('./editor/editor');
const files = require('./editor/files');

function createWindow() {
    let win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            show: false,
            nodeIntegration: true
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/files/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    
    // Open Dev Tools
    win.webContents.openDevTools();

    win.on('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });

}

app.on('ready', () => {
    createWindow();

    Menu.setApplicationMenu(null);
    setMenuBar();
});

function setMenuBar() {
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
                {
                    label: 'Open',
                    click: () => {
                        editor.fileDialog();
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

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
});

// app.on('open-file', (filePath) => {
//    editor.openFile(filePath);
// });
