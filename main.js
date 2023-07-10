const { app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const fs = require('fs');
const axios = require('axios');
const { print } = require('pdf-to-printer')
const VirtualKeyboard = require('electron-virtual-keyboard')
const filePath = path.join(__dirname, 'config.json');
let index;

const createindexWindow = () => {
    index = new BrowserWindow({
    title: 'eDoxSat',
    width: 1024,
    height: 768,
    kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  index.loadFile('./view/index.html')
  vkb = new VirtualKeyboard(index.webContents)
  index.removeMenu()
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
    const outputPath =  path.join(__dirname, 'facturas/')
    const pdfPath = `${outputPath}factura_${timestamp}.pdf`;
    axios.get(url, { responseType: 'arraybuffer' })
    .then(response => {
      fs.writeFileSync(pdfPath, Buffer.from(response.data));
      print(pdfPath, {
        silent: true,
        printBackground: true,
        copies: 1
      })
        .then(() => {
          console.log('La impresion se ha completado.');
          try {
            fs.unlinkSync(pdfPath)            
            console.log('Archivo borrado correctamente')
          } catch (error) {
            console.log('Error al borrar el archivo'. error)
          }
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

//imprime la factura
ipcMain.handle('files:print',(event, url) => {
  createprintWindow(url)
})

//cierra la app
ipcMain.handle('closeapp:close', async () => {
  app.quit()
  index.close()
})

// Escuchar el evento de registro desde el proceso de renderizado
ipcMain.on('register', (event, data) => {

  //old
  let jsonData = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
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

ipcMain.on('delete', (event, data) => {

  //old
  let jsonData = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
  }

  // Agregar los nuevos datos al arreglo existente
  jsonData.push(data);

  // Guardar los datos actualizados en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
});