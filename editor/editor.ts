import { dialog } from "electron";
import * as files from "./files";
import * as fs from 'fs';
import { Image } from "babylonjs-gui";

export class Project {
    private projectFiles:string[];
    private organizedProjectFiles = {
        scripts: [],
        scenes: [],
        models: [],
        animations: [],
        images: [],
        audio: [],
        unknown: []
    };
    private openedFiles:string[];
    private currentFile = null;

    private folderPath:string;
    private thumbnail:Image;

    constructor(folderPath: string, thumbnailPath: string) {
        this.folderPath = folderPath;
        try {
            this.thumbnail = new Image('Thumbnail', 'file://'+folderPath+'/.thumbnail.png');
        } catch(e) {
            showError('An error occured while opening the thumbnail for project "' + folderPath.split('/')[-1].split('\\')[-1] + '"! (thumbnail.png)');
            console.error(e);
        }
    }

    updateProjectFiles() {
        var files = [];
        try{
            fs.readdirSync(this.folderPath).forEach(file => {
                files.push(file);
            });
        } catch(e) {
            showError('Error reading project directory.');
            console.error(e);
        }

        this.projectFiles = files;
        this.projectFiles.forEach(file => {
            var extension = file.split('.')[-1].toLowerCase();
            
            // Ugly but needed.
            switch (extension) {
                // Scripts
                case 'zscript':
                    this.organizedProjectFiles.scripts.push(file);
                    break;
                // Scenes
                case 'zscene':
                    this.organizedProjectFiles.scenes.push(file);
                    break;
                // Objects
                case 'stl':
                    this.organizedProjectFiles.models.push(file);
                    break;
                case 'obj':
                    this.organizedProjectFiles.models.push(file);
                    break;
                case 'fbx':
                    this.organizedProjectFiles.models.push(file);
                    break;
                case '3ds':
                    this.organizedProjectFiles.models.push(file);
                    break;
                case 'collada':
                    this.organizedProjectFiles.models.push(file);
                    break;
                case 'iges':
                    this.organizedProjectFiles.models.push(file);
                    break;
                // Images
                case 'png':
                    this.organizedProjectFiles.images.push(file);
                    break;
                case 'jpg':
                    this.organizedProjectFiles.images.push(file);
                    break;
                case 'jpeg':
                    this.organizedProjectFiles.images.push(file);
                    break;
                // Audio
                case 'mp3':
                    this.organizedProjectFiles.audio.push(file);
                    break;
                case 'wav':
                    this.organizedProjectFiles.audio.push(file);
                    break;
                case 'aiff':
                    this.organizedProjectFiles.audio.push(file);
                    break;
                // If none of them are known, add them to unknown.
                default:
                    this.organizedProjectFiles.unknown.push(file);
                    break;
            };
        });
    }

    updateCurrentFile() {
        if (this.openedFiles[this.currentFile] == (undefined || null)) {
            this.currentFile = null;
        }
    }

    getProjectFiles() {
        return this.projectFiles;
    }
    getOrganizedProjectFiles() {
        return this.organizedProjectFiles;
    }
    getOpenedFiles() {
        return this.openedFiles;
    }
    getCurrentlyOpenedFile() {
        return this.currentFile;
    }
    getFolderPath() {
        return this.folderPath;
    }
    getThumbnail() {
        return this.thumbnail;
    }
}

export function getCurrentProject(): Project {
    return new Project('',''); // HEPLP
}

export function updateFileData (file, data, value): boolean {
    // Update file data (GUI).
    // TODO: Add implementation.
    return true;
}
export function updateCurrentFileData (data: string, value: any): boolean {
    // Go to files.js for refrence.
    // This will update the GUI of the editor in the current file.
    updateFileData(getCurrentProject().getCurrentlyOpenedFile(), data, value);
    return true;
}

export function showError (msg: string): boolean {
    // Show Error dialog
    dialog.showErrorBox("Bruh moment", msg);
    return true;
}
