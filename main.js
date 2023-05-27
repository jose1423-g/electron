const { fail } = require('assert')
const { app, BrowserWindow, ipcMain, webContents, Menu} = require('electron')
const path = require('path')
// const connection = require('./app.js') conexion a db

var options = {
  silent: true,
  printBackground: true,
  color: false,
  margin: {
      marginType: 'printableArea'
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Header of the Page',
  footer: 'Footer of the Page'
}

const createindexWindow = () => {
  const index = new BrowserWindow({
    width: 800,
    height: 600,
    // kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  index.loadFile('./src/index.html')

  const template = [
    {
      label: 'Ventanas',
      submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => {console.log('Electron click')}
      },
      {role: 'quit'},
    ]
    },
    {
      label: 'Herramientas',
      submenu: [
        {role: 'about'},
        {role: 'toggleDevTools'},
        {role: 'reload'}
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
const createprintWindow = (url) => {
    const print = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    })  
    print.loadURL(url)
    print.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason)
    })  
}

ipcMain.handle('files:print',(event, url) => {
  createprintWindow(url)
  return "holis si jalo"; 
})

app.whenReady().then(() => { 
  createindexWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createindexWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})