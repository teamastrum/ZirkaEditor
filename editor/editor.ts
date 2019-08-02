import { dialog } from "electron";
import * as files from "./files";

export function getAllOpenedFiles () {
    // Gets all currently opened files.
    // TODO: Add implementation
    return [];
}

export function getAllProjectFiles () {
    // TODO: Add implementation
    return [];
}

export function getCurrentlyOpenedFile (): files.file {
    // TODO: Add file implementation in editor (After editor GUI is done and file editor is completed.)
    var file = new files.file('./yes.txt');
    return file;
}

export function updateFileData (file, data, value): boolean {
    // Update file data (GUI).
    // TODO: Add implementation.
    return true;
}
export function updateCurrentFileData (data: string, value: any): boolean {
    // Go to files.js for refrence.
    // This will update the GUI of the editor in the current file.
    updateFileData(getCurrentlyOpenedFile(), data, value);
    return true;
}

export function showError (msg: string): boolean {
    // Show Error dialog
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}
