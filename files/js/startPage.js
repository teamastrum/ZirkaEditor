var ipc = require('electron').ipcRenderer;
const editor = require('../../editor/editor');

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

btn1.addEventListener('click', () => {
    ipc.send('showEditor');
});