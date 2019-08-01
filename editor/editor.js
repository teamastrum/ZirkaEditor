const { dialog } = require('electron');
const files = require('./files');

exports.showError = (msg) => {
    // Shows error box
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}

exports.getCurrentFile = () => {
    // TODO: Add file implementation in editor (After editor GUI is done and file editor is completed.)
    var file = new files.file('yes.txt', 'yes');
    return file;
}

exports.getAllOpenFiles = () => {
    // Gets all currently opened files.
    // TODO: Add implementation
    return [];
}

exports.getAllFiles = () => {
    // Gets all project files.
    // TODO: Add implementation
    return [];
}

exports.updateCurrentFileData = (data, value) => {
    // Go to files.js for refrence.
    // This will update the GUI of the editor in the current file.
    exports.updateFileData(exports.getCurrentFile(), data, value);
    return true;
}

exports.updateFileData = (file, data, value) => {
    // Update file data (GUI).
    // TODO: Add implementation.
    return true;
}
