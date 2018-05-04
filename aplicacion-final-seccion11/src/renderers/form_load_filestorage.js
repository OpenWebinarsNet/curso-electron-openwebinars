const fs = require("fs");
const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");

document.getElementById("btn_cancel").onclick = () => {
  window.close()
}

document.getElementById("btn_select_file").onclick = e => {
  e.preventDefault();
  dialog.showOpenDialog(
    {
      title: "Selecciona el almacén de claves"
    },
    filename => {
      document.getElementById("file").value = filename.toString()
    }
  )
}

document.getElementById("btn_ok").onclick = () => {
  let key = document.getElementById("key").value
  let file = document.getElementById("file").value

  // Enviamos los datos necesario para crear objetos KeyStorage al proceso
  // principal
  ipcRenderer.send('load-keystorage', { file: file, key: key })
  
  window.close()
};
