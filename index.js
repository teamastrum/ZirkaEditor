const electron = require('electron');
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');
const Menu = electron.Menu;

const editor = require('./editor/editor');
const files = require('./editor/files');

function createWindow() {
    let win = new BrowserWindow({
        width: 600,
        height: 400,
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

    // win.webContents.openDevTools();

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
