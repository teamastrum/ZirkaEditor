"use strict";
exports.__esModule = true;
var fs = require("fs");
var editor = require("./editor.js");
var electron_1 = require("electron");
// File class. VERY IMPORTANT!!!! LEAVE SLENDI WORK ON IT!!!!
var file = /** @class */ (function () {
    function file(filePath) {
        this.filePath = filePath;
        this.data = 'data';
        //this.info = fs.statSync(filePath); // TIS SHIT GAVE ME A LOT OF PAIN
    }
    file.prototype.read = function () {
        return this.data;
    };
    return file;
}());
exports.file = file;
function saveFile(filePath) {
    // Check if file is undefined/Save As dialog closed
    if (filePath == undefined) {
        return false;
    }
    var file = fs.existsSync(filePath);
    // FOR FUTURE
    // // Read the file at filePath
    // var file = fs.readFile(filePath, 'utf8', (err, contents) {
    //     if (err != null || err != undefined) { // If there's any errors, log em
    //         console.log(err);
    //         return false;
    //     } else {
    //         return contents;
    //     }
    // });
    // If there is a file
    if (file != false) {
        try {
            // Write to the file the new data
            fs.writeFileSync(filePath, editor.getCurrentlyOpenedFile().data);
        }
        catch (err) {
            // If an error occurs, tell the user
            editor.showError('Couldn\'t save file. (File write error)');
            console.error(err); // and log it.
            return false;
        }
        // Tell the editor to update the UI (fileSaved is like that white dot in vscode next to the filename)
        editor.updateCurrentFileData('fileSaved', 'true');
    }
    else {
        return false;
    }
    // If no errors occured return true
    return true;
}
exports.saveFile = saveFile;
function saveAsFile() {
    // Set the options for the save file dialog
    var options = {
        defaultPath: require('os').homedir()
    };
    // Show the save file dialog
    var filePath = electron_1.dialog.showSaveDialogSync(null, options);
    try {
        // If file already exists
        if (fs.existsSync(filePath)) {
            // then perform the normal save file
            return exports.saveFile(filePath);
        }
        else {
            // if not, create a new file
            fs.closeSync(fs.openSync(filePath, 'w'));
            // and perform the normal save file
            return exports.saveFile(filePath);
        }
    }
    catch (err) {
        // If any error happens, log it and tell the user what happened.
        console.error(err);
        editor.showError("Couldn't save file. (fs.existsSync threw error)");
    }
}
exports.saveAsFile = saveAsFile;
;
function checkFType(filePath) {
    // Create a empty string variable
    var fileExtension;
    try {
        // Try to get the file extension
        fileExtension = filePath.split('/')[-1].split('.')[-1];
    }
    catch (_a) {
        // If any error happened, try again in a diffrent way.
        fileExtension = filePath.split('.')[-1];
    }
    // A switch statement for each file extension case
    switch (fileExtension) {
        case 'zscene':
            return 'scene';
        case 'zscript':
            return 'script';
        default:
            return fileExtension;
    }
}
exports.checkFType = checkFType;
function open() {
    // TODO: Add implementation
}
exports.open = open;
