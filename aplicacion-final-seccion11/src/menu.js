const { BrowserWindow } = require("electron");

/**
 * 
 * browserWindow, la panatalla padre
 * width, anchura pantalla modal 
 * height altura pantalla modal
 * url, url del código a cargar en el proceso renderer
 */
function createFormModal(browserWindow, width, height, url) {
    let winForm = new BrowserWindow({
      width: width,
      height: height,
      frame: false,
      parent: browserWindow,
      modal: true
    })
    winForm.loadURL(url)
  }  

// browserWindow es la pantalla sobre la que se quiere crear el menú
let mainMenu = browserWindow => {
  let templateMenu = [
    {
      label: "Almacenes",
      submenu: [
        {
          label: "crear",
          accelerator: "CommandOrControl+N",
          click() {
            let url = `file://${__dirname}/renderers/form_create_filestorage.html`;
            createFormModal(browserWindow, 400, 350, url);
          }
        },
        {
          label: "cargar",
          accelerator: "CommandOrControl+L",
          click() {
            let url = `file://${__dirname}/renderers/form_load_filestorage.html`;
            createFormModal(browserWindow, 400, 350, url);
          }
        },
        {
          label: "salir",
          role: "quit"
        }
      ]
    },
    {
      label: "Acciones",
      submenu: [
        {
          label: "Añadir clave",
          accelerator: "CommandOrControl+B",
          click() {
            let url = `file://${__dirname}/renderers/form_add_keyregister.html`;
            createFormModal(browserWindow, 500, 550, url);
          }
        },
        {
          label: "Editar clave",
          accelerator: "CommandOrControl+E",
          click() {
            browserWindow.webContents.send('edit-keyregister')
          }
        },
        {
          label: "Eliminar clave",
          accelerator: "CommandOrControl+D",
          click() {
            browserWindow.webContents.send('delete-keyregister')
          }
        }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    }
  ];

  return templateMenu;
};

module.exports.mainMenu = mainMenu;
