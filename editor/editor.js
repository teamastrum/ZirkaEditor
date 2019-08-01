const { dialog } = require('electron');
const files = require('./files');

exports.showError = (msg) => {
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}

exports.getCurrentFile = () => {
    var file = new files.file('yes.txt', 'yes');
    return file;
}
exports.updateCurrentFileData = (data, value) => {

}