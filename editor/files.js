const fs = require('fs');
const editor = require('./editor.js');

exports.file = class {
    constructor (filePath, data) {
        this.filePath = filePath;
        this.data = data;
    }
}

exports.saveFile = (filePath) => {
    // if (exports.checkFType(filePath)) {
    //     return true;
    // }
    var file = fs.readFile('DATA', 'utf8', (err, contents) => {
        if (err != null) {
            return false;
        } else {
            return contents;
        }
    });
    
    if (file != false) {
        // if (editor.getCurrentFile().read() == file && editor.getCurrentFile().filePath == filePath) {
            fs.writeFile(filePath, editor.getCurrentFile().data, (err) => {
                if (err) {
                    editor.showError('Couldn\'t save file. (File write error)');
                    return false;
                }

                editor.updateCurrentFileData('fileSaved', ' true');
            });
        // }
    } else {
        return false;
    }
    return true;
}

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
