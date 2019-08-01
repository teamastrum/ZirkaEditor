const fs = require('fs');
const editor = require('./editor.js');
const { dialog, app } = require('electron');

exports.file = class {
    constructor (filePath) {
        this.filePath = filePath;
        this.data = null;
        this.info = fs.statSync(filePath);
    }

    read() {
        return fs.readFileSync(this.filePath);
    }


}

exports.saveFile = (filePath) => {
    // if (exports.checkFType(filePath)) {
    //     return true;
    // }
    if (filePath == null) {
        filePath = exports.saveAsFile();
    }
    var file = fs.existsSync(filePath); //Check if file exists?
    
    if (file != false) {
        try {
            fs.writeFileSync(filePath, editor.getCurrentFile().data);
        } catch (err) {
            editor.showError('Couldn\'t save file. (File write error)');
            console.error(err);
            return false;
        }    
        console.log('yes');
        editor.updateCurrentFileData('fileSaved', 'true');
    } else {
        return false;
    }
    return true;
}

exports.saveAsFile = () => {
    const options = {
        defaultPath: require('os').homedir(),
    };
    var filePath = dialog.showSaveDialogSync(null, options);
    try {
        if (fs.existsSync(filePath)) {
            return exports.saveFile(filePath);
        } else {
            fs.closeSync(fs.openSync(filePath, 'w'));
            return exports.saveFile(filePath);
        }
    } catch (err) {
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
