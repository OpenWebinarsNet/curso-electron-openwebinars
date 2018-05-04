const fs = require("fs");
const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
const { Crypter } = require("../modules/Crypter");
const { KeyStorage } = require("../modules/KeyStorage");

document.getElementById("btn_cancel").onclick = () => {
  window.close()
};

document.getElementById("btn_select_file").onclick = e => {
  e.preventDefault();
  dialog.showSaveDialog(
    {
      title: "¿Dónde quieres guardar el almacen de claves?"
    },
    filename => {
      document.getElementById("file").value = filename.toString()
    }
  )
}

document.getElementById("btn_ok").onclick = (e) => {
  e.preventDefault()
  let key = document.getElementById("key").value
  let file = document.getElementById("file").value

  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }

  let crypter = new Crypter()

  let keyStorage = new KeyStorage(crypter, file)
  keyStorage.openDataFile(key)

  // Enviamos los datos necesario para crear objetos KeyStorage al proceso
  // principal
  ipcRenderer.send('load-keystorage', { file: file, key: key })

  window.close()
};
