let contents,fileView,maskDir;

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();

    reader.onload = function (e) {
        contents = e.target.result;
        fileView = new Uint8Array(contents);
        displayContents(contents);
    };
    reader.readAsArrayBuffer(file);
}

function arrayBufferToFile(buffer) {
    if (!contents) return;

    saveAscii();

    let fileName = document.getElementById("newFileName").value;
    //By creatibng a view we edit the array buffer via the viwe
    fileView = new Uint8Array(buffer);
    //now when we create the blob, the buffer reflects the change made to fileView
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    // Create a link element
    var link = document.createElement("a");
    // Set the href and download attributes for the link
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.rt4`;
    // Append the link to the body
    document.body.appendChild(link);
    // Click the link to start the download
    link.click();
    // Remove the link from the body
    document.body.removeChild(link);
}

function displayContents() {
    var valueDisplayEl = document.getElementById("file-content");
    valueDisplayEl.textContent = fileView;

    ///get mask directory - starts at index 114
    let dir = [];
    let i = 0;
    while (fileView[144 + i]) {
        dir.push(fileView[144 + i]);
        i++;
    }
    maskDir = String.fromCharCode(...dir)
    document.getElementById("mask-dir").value = maskDir
}

function saveAscii(){
    maskDir = document.getElementById("mask-dir").value

    for (let i = 0; i < maskDir.length; i++) {
        fileView[144 + i]=maskDir.charCodeAt(i)
    }
    maskDir.charCodeAt();
};


document.getElementById("file-input").addEventListener("change", readSingleFile, false);
document
    .getElementById("save-button")
    .addEventListener("mouseup", () => arrayBufferToFile(contents));
