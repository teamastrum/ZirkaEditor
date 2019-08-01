const { dialog } = require('electron');
const files = require('./files');
currentFiles = new Set();
currentFile = null;

exports.showError = (title, msg) => {
    dialog.showErrorBox(title, msg);
    return true;
}

exports.showDialog = (msg) => {
    dialog.showMessageBoxSync("Bruh moment", {title:msg});
}

exports.getCurrentFile = () => {
    return currentFile;
}

exports.closeFile = (filePath) => {
    
}

exports.updateCurrentFileData = (data, value) => {
	dialog.showMessageBoxSync("Bruh moment", {title: "bruh"})
	files.saveFile(currentFile.filePath)
}

exports.openFile = (filePath) => {
    this.showError("Sucess", "Opening file: " + filePath);
    currentFile = new files.file(filePath);
}

exports.fileDialog = () => {
    //Ask for file select :)
    dialog.showOpenDialog("Open File", {
        properties: ['openFile']
    }).then(res => {
        this.openFile(res.filePaths[0]);
    })
    return true;
}
