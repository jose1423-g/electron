// const { app, BrowserWindow } = require('electron') importa dos modulos electron 
// modulo app = controla el ciclo de vida de los eventos de su aplicacion
// modulo BrowserWindow = crea y administra ventanas de aplicaciones
// __dirname = apunta a la ruta del script que se esta ejecutando actualmente en este caso la carpeta raiz de su proyecto
// path.json = api une varios segmentos de ruta creando  una cadena  de ruta combinada que funciona en todas las plataformas
// funcion createWindow = carga su pagina web en una nueva instancia de BrowserWindow
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  /* ipcMain.handle('ping', () => 'pong') */
  win.loadFile('index.html')
}

ipcMain.handle('darkmode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
  } else {
      nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
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



