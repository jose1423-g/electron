// importa dos modulos electron 
const { app, BrowserWindow } = require('electron')
// modulo app = controla el ciclo de vida de los eventos de su aplicacion
// modulo BrowserWindow = crea y administra ventanas de aplicaciones

// funcion createWindow = carga su pagina web en una nueva instancia de BrowserWindow
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}
// llama a su funcion cuando la aplicacion esta lista
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})