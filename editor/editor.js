const { dialog } = require('electron');
const files = require('./files');

// The main editor class.
exports.editor = class {
    constructor () {
        this.openedFiles = [];
        this.currentFile = new files.file(null);
    }

    getAllOpenFiles() {
        // Gets all currently opened files.
        return this.openedFiles;
    }

    getAllProjectFiles() {
        // TODO: Add implementation
        return [];
    }

    getCurrentlyOpenedFile() {
        // TODO: Add file implementation in editor (After editor GUI is done and file editor is completed.)
        return this.currentFile;
    }

    updateFileData(file, data, value) {
        // Update file data (GUI).
        // TODO: Add implementation.
        return true;
    }
    updateCurrentFileData(data, value) {
        // Go to files.js for refrence.
        // This will update the GUI of the editor in the current file.
        this.updateFileData(this.getCurrentFile(), data, value);
        return true;
    }
}

exports.showError = (msg) => {
    // Show Error dialog
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}
