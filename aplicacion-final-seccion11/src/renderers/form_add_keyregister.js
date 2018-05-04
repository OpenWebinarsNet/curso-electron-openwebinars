const { ipcRenderer } = require("electron");
const { Crypter } = require("../modules/Crypter");
const { KeyStorage } = require("../modules/KeyStorage");

document.getElementById("btn_cancel").onclick = () => {
  window.close()
}

document.getElementById("btn_ok").onclick = () => {
  let title = document.getElementById("title").value
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  let url = document.getElementById("url").value
  let note = document.getElementById("note").value

  let id =  "_" + Math.random().toString(36).substr(2, 9)

  let register = {}

  register[id] = {
    title: title,
    username: username,
    password: password,
    url: url,
    note: note
  };

  // Enviamos el registro a añadir al proceso principal
  ipcRenderer.send("add-keyregister", register)

  window.close()
}
