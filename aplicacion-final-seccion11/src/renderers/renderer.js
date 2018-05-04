const { ipcRenderer } = require('electron')
const { Crypter } = require('../modules/Crypter')
const { KeyStorage } = require('../modules/KeyStorage')
const { GUI } = require('../modules/GUI')
const path = require('path')

let crypter, keyStorage
let gui = new GUI(document)
gui.init()

// Carga del fichero del almacén
ipcRenderer.on('load-keystorage', (e, args) => {
    let file = args.file
    let key = args.key

    crypter = new Crypter()    
    keyStorage = new KeyStorage(crypter, file)
    keyStorage.openDataFile(key)

    gui.setKeyStorage(keyStorage)
    gui.updateRegisterList(keyStorage.getAll())
    gui.setAppTitle(`Almacén de claves ACME (${path.parse(file).base})`)
    
})

// Añadir registros al almacén
ipcRenderer.on('add-keyregister', (e, register) => {
    keyStorage.add(register)
    keyStorage.save()
    gui.updateRegisterList(keyStorage.getAll())
})

// Editar un registro
ipcRenderer.on('edit-keyregister', (e) => {
    gui.editRegister()
})

// Eliminar un registro
ipcRenderer.on('delete-keyregister', (e) => {
    gui.deleteRegister()
})