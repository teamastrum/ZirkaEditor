const fs = require('fs');
const editor = require('./editor.js');
const { dialog, app } = require('electron');

exports.file = class {
    constructor (filePath, data) {
        this.filePath = filePath;
        this.data = data;
    }
    read() {
        return this.data;
    }
}

exports.saveFile = (filePath) => {
    // if (exports.checkFType(filePath)) {
    //     return true;
    // }
    if (filePath == 'newFile') {
        filePath = exports.saveAsFile();
    }

    if (filePath == undefined) {
        return false;
    }

    // Read the file at filePath
    var file = fs.readFile(filePath, 'utf8', (err, contents) => {
        if (err != null || err != undefined) { // If there's any errors, log em
            console.log(err);
            return false;
        } else {
            return contents;
        }
    });
    
    if (file != false) { // If there's a problem with the file, return false
        // Otherwise, write to the filePath the new data.
        try {
            fs.writeFileSync(filePath, editor.getCurrentFile().data);
        } catch (err) {
            // If any error occures, show error dialog and print error to command line
            editor.showError('Couldn\'t save file. (File write error)');
            console.error(err);
            return false;
        }
        // You know how like editors have this dot that tells u if u saved or not? This is it.
        editor.updateCurrentFileData('fileSaved', 'true');
    } else {
        return false;
    }
    // If no errors were made, return true
    return true;
}

exports.saveAsFile = () => {
    // Define options for our save dialog
    const options = {
        defaultPath: require('os').homedir(),
    };

    // Show the save dialog and store the file path in a variable
    var filePath = dialog.showSaveDialogSync(null, options);
    
    try {
        // If file already exists, just overwrite it
        if (fs.existsSync(filePath)) {
            return exports.saveFile(filePath);
        } else {
            // If not, create a new file and then write to it.
            fs.closeSync(fs.openSync(filePath, 'w'));
            return exports.saveFile(filePath);
        }
    } catch (err) {
        // If any errors were made, log them into the console and show error dialog.
        console.error(err);
        editor.showError("Couldn't save file. (fs.existsSync threw error)");
    }
    
};

exports.checkFType = (filePath) => {
    var fileExtension = ''
    try {
        fileExtension = filePath.split('/')[-1].split('.')[-1];
    } catch {
        fileExtension = filePath.split('.')[-1];
    }
    switch (fileExtension) {
        case 'zscene':
            return 'scene';
        case 'zscript':
            return 'script';
        default:
            return fileExtension;
    }
}
