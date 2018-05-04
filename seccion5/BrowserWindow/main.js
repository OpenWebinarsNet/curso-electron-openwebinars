const { app, BrowserWindow, dialog, session } = require('electron')
const windowStateKeeper = require('electron-window-state');

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {

  let mainWindowState = new windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  }) 

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: mainWindowState.defaultWidth,
    height: mainWindowState.defaultHeight,
    x: mainWindowState.x,
    y: mainWindowState.y
  })

  mainWindowState.manage(mainWindow)
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.on('new-window', (e, url) => {
    console.log(url)
    e.preventDefault()
    let modalWindow = new BrowserWindow({
      width: 600,
      height: 400,
      parent: mainWindow,
      modal: true
    })

    modalWindow.loadURL(url)
  })

  // setTimeout(() => {
  //   mainWindow.setFullScreen(true)
  // }, 2000)

  // mainWindow.on('enter-full-screen', () => {
  //   setTimeout(() => {
  //     mainWindow.setFullScreen(false)
  //   }, 2000)
  // })

  mainWindow.webContents.on('media-started-playing', (e, a) => {
    console.log('el vídeo comienza a reproducirse')
    console.log(e)
    console.log(a)
  })

  mainWindow.webContents.on('context-menu', (e, a) => {
    console.log(a.mediaType)
  })


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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

app.on('before-quit', async (e) => {
  console.log('before-quit')
  let d = dialog.showMessageBox(mainWindow, {
    message: "deseas salir?",
    buttons: ['si', 'no']
  })

  if (d == 1) {
    e.preventDefault()
  }
})


console.log(app.getPath('downloads'))