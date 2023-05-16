// const { app, BrowserWindow } = require('electron') importa dos modulos electron 
// modulo app = controla el ciclo de vida de los eventos de su aplicacion
// modulo BrowserWindow = crea y administra ventanas de aplicaciones
// __dirname = apunta a la ruta del script que se esta ejecutando actualmente en este caso la carpeta raiz de su proyecto
// path.json = api une varios segmentos de ruta creando  una cadena  de ruta combinada que funciona en todas las plataformas
// funcion createWindow = carga su pagina web en una nueva instancia de BrowserWindow
const { app, BrowserWindow, ipcMain, nativeTheme, Menu} = require('electron')
const path = require('path')
const connection = require('./app.js') 

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1240,
    height: 1240,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('index.html')

  const template = [
    {
      label: 'Ventanas',
      submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => {console.log('Electron click')}
      },
      { 
        role: 'window', click: () => {win.loadFile('main.html')}
      }]
    },
    {
      label: 'Herramientas',
      submenu: [
        {role: 'about'},
        {role: 'toggleDevTools'}
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

//funcion para cambiar el color de la aplicacion
ipcMain.handle('darkmode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
  } else {
      nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('ping', () => 'pong')

ipcMain.handle('hello', () => {
  return "holis diste click por que en el main?";
}) 

ipcMain.handle('data:respuesta', () => {
  data_json();
}) 

app.whenReady().then(createWindow)
// llama a su funcion cuando la aplicacion esta lista
app.whenReady().then(() => { 
  // createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// function data_json(){
//   var holis = "funcion data_json"
//   console.log(holis)
  
//   /* const data = {
//     method: 'GET'
// };
// fetch('https://gasofac.mx/ria/cte.php', data)
//     .then(response => response.json())
//     .then(datos => {
//         console.log(datos);
//     }) */
// }


