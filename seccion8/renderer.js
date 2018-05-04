const { shell }  = require("electron");
const {app} = require("electron").remote

console.log(process.versions)
console.log(process.type)
console.log(process.resourcesPath)
console.log(process.pid)

document.getElementById("btn_pita").addEventListener("click", () => {
    shell.beep()
})

document.getElementById("btn_abre_google").addEventListener("click", () => {
    shell.openExternal("http://google.es")
})

document.getElementById("btn_abre_home").addEventListener("click", () => {
    let homeDir = app.getPath('home')
    shell.openItem(homeDir)
})