const { webFrame } = require("electron");
const { BrowserWindow } = require("electron").remote

let zoom = 0

document.getElementById("crear_ventana").addEventListener("click", () => {

    let parentWindow = BrowserWindow.fromId(1)

    let newWindow = new BrowserWindow({width: 600, heigth: 400, parent: parentWindow, modal: true})

    newWindow.loadURL('http://google.es')

})

document.getElementById("zoom_in").addEventListener("click", () => {
    webFrame.setZoomLevel(++zoom)
});



document.getElementById("zoom_out").addEventListener("click", () => {
    webFrame.setZoomLevel(--zoom)
});


document.getElementById("zoom_reset").addEventListener("click", () => {
    webFrame.setZoomLevel(zoom = 0)
});