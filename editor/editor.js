const { dialog } = require('electron');
const files = require('./files');

exports.getAllOpenedFiles = () => {
    // Gets all currently opened files.
    // TODO: Add implementation
    return [];
}

exports.getAllProjectFiles = () => {
    // TODO: Add implementation
    return [];
}

exports.getCurrentlyOpenedFile = () => {
    // TODO: Add file implementation in editor (After editor GUI is done and file editor is completed.)
    var file = new files.file('./yes.txt');
    return file;
}

exports.updateFileData = (file, data, value) => {
    // Update file data (GUI).
    // TODO: Add implementation.
    return true;
}
exports.updateCurrentFileData = (data, value) => {
    // Go to files.js for refrence.
    // This will update the GUI of the editor in the current file.
    exports.updateFileData(exports.getCurrentlyOpenedFile(), data, value);
    return true;
}

exports.showError = (msg) => {
    // Show Error dialog
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}
