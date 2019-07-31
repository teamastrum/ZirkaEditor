const fs = require('fs');

return {
    'saveFile': (filePath) => {
        var file = fs.readFile('DATA', 'utf8', (err, contents) => {
            if (err != null) {
                return false;
            } else {
                return contents;
            }
        });
        
        if (file != false) {
            if (editor.getCurrentFile().read() == file && editor.getCurrentFile().filePath == filePath) {
                fs.saveFile(filePath, editor.getCurrentFile().read(), (err) => {
                    if (err) {
                        editor.showError('Couldn\'t save file. (File write error)');
                        return false;
                    }

                    editor.updateCurrentFileData('write', 'true');
                });
            }
        } else {
            return false;
        }
        return true;
    },
    'checkFType': (filePath) => {
        var fileExtension = filePath.split('/')[-1].split('.')[-1];
        switch (fileExtension) {
            case 'zscene':
                return 'scene';
            case 'zscript':
                return 'script';
            default:
                return fileExtension;
        }
    }
};