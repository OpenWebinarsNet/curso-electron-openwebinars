const { app, BrowserWindow, Menu, MenuItem, Tray } = require('electron')

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let menuTemplate = [
  {
    label: "menu1",
    click() { console.log('menu1') },
    submenu: [
      {
        label: "menu11",
        accelerator: "CommandOrControl+T",
        click() { console.log('menu11') }
      },
      {
        label: "menu12",
        click() { console.log('menu12') }
      }
    ]
  },
  {
    label: "menu2",
    submenu: [
      {
        label: 'quit',
        role: 'quit'
      }
    ]
  }
]

let menuItem1 = new MenuItem({
  label: "menu1",
  click() { console.log('menu1') },
  submenu: [
    {
      label: "menu11",
      accelerator: "CommandOrControl+T",
      click() { console.log('menu11') }
    },
    {
      label: "menu12",
      click() { console.log('menu12') }
    }
  ]
})

let menuItem2 = new MenuItem({
  label: "menu2",
  submenu: [
    {
      label: 'quit',
      role: 'quit'
    }
  ]
})

let menu = new Menu()

menu.append(menuItem1)
menu.append(menuItem2)

let menu2 = Menu.buildFromTemplate(menuTemplate)

let tray = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  Menu.setApplicationMenu(menu2)

  mainWindow.webContents.on('context-menu', (e, args) => {
    menu.popup(mainWindow)
  })

  tray = new Tray("space-invaders.png")
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
