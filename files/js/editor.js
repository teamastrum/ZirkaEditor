window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function setImage(imgTag, path) { // Why the imgTag? When we add multiple tabs, 
    // we could have multiple <img> tags. We could use jQuery OR get all elements 
    // by a class and loop trough them.
    imgTag.src = 'file://' + path;
}
