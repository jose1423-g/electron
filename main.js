const { app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const fs = require('fs');
const axios = require('axios');
const { print } = require('pdf-to-printer')
const VirtualKeyboard = require('electron-virtual-keyboard')

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
    // kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')

    },
  })

  index.loadFile('./view/index.html')
  vkb = new VirtualKeyboard(index.webContents)
  
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
    const printpdf = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    })  
    printpdf.loadURL(url)
    // se imprime automaticamente sin mostrar la ventana de impresion
    const timestamp = Date.now();
    const outputPath =  path.join(__dirname, 'facturas')
    const pdfPath = `${outputPath}factura_${timestamp}.pdf`;
    axios.get(url, { responseType: 'arraybuffer' })
    .then(response => {
      fs.writeFileSync(pdfPath, Buffer.from(response.data));
      // console.log('El archivo PDF se ha descargado correctamente.');
      print(pdfPath, {
        silent: true,
        printBackground: true,
        copies: 1
      })
        .then(() => {
          console.log('La impresion se ha completado.');
        })
        .catch(error => {
          console.error('Error al imprimir:', error);
        });
    })
    .catch(error => {
      console.error('Error al descargar el archivo PDF:', error);
    });
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

 // print.loadURL(url)
  // print.webContents.print(options, (success, failureReason) => {
  //   if (!success) console.log(failureReason)
  // })  