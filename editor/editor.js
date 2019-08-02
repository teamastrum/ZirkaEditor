"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var files = require("./files");
function getAllOpenedFiles() {
    // Gets all currently opened files.
    // TODO: Add implementation
    return [];
}
exports.getAllOpenedFiles = getAllOpenedFiles;
function getAllProjectFiles() {
    // TODO: Add implementation
    return [];
}
exports.getAllProjectFiles = getAllProjectFiles;
function getCurrentlyOpenedFile() {
    // TODO: Add file implementation in editor (After editor GUI is done and file editor is completed.)
    var file = new files.file('./yes.txt');
    return file;
}
exports.getCurrentlyOpenedFile = getCurrentlyOpenedFile;
function updateFileData(file, data, value) {
    // Update file data (GUI).
    // TODO: Add implementation.
    return true;
}
exports.updateFileData = updateFileData;
function updateCurrentFileData(data, value) {
    // Go to files.js for refrence.
    // This will update the GUI of the editor in the current file.
    updateFileData(getCurrentlyOpenedFile(), data, value);
    return true;
}
exports.updateCurrentFileData = updateCurrentFileData;
function showError(msg) {
    // Show Error dialog
    electron_1.dialog.showErrorBox("Bruh moment", msg);
    return true;
}
exports.showError = showError;
