const { app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const fs = require('fs');
// const express = require('express');
// const expressApp = express();
// const port = 3000;

const filePath = path.join(__dirname, 'config.json');

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
    kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  index.loadFile('./view/index.html')

  const template = [
    {
      label: 'Cerrar aplicacion',
      submenu: [
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

app.whenReady().then(() => { 
  createindexWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createindexWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('files:print',(event, url) => {
  createprintWindow(url)
  return "holis si jalo"; 
})

// Escuchar el evento de registro desde el proceso de renderizado
ipcMain.on('register', (event, data) => {

  //old
  let jsonData = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    //  jsonData = JSON.parse(fileData);
  }

  // Agregar los nuevos datos al arreglo existente
  jsonData.push(data);

  // Guardar los datos actualizados en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  // Mostrar un diálogo de confirmación al usuario
  dialog.showMessageBoxSync({
    type: 'info',
    title: 'Guardado exitoso',
    message: 'Los datos se han guardado correctamente.'
  });
});