const {ipcRenderer} = require('electron')

// Envía mensaje síncrono
let r = ipcRenderer.sendSync('elcanal', 'mensaje desde renderer')
console.log(r);

// Envía mensaje asíncrono
ipcRenderer.send('elcanalasync', 'mensaje async desde renderer')

console.log('hola')

ipcRenderer.on('canal_respuesta', (event, arg) => {
   console.log(arg)
})

// Recibe mensaje asíncrono
ipcRenderer.on('elcanal', (event, arg) => {
    console.log(arg)
 })
 