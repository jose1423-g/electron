const { contextBridge, ipcRenderer} = require('electron')
// const fs = require('fs')


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // también podemos exponer variables, no sólo funciones
})

contextBridge.exposeInMainWorld('files', {
  print: (url) => ipcRenderer.invoke('files:print', url),
})

/* contextBridge.exposeInMainWorld('login', {
  acceso: () => ipcRenderer.invoke('acceso')
}) */

/* contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('darkmode:toggle')
}) */

/* contextBridge.exposeInMainWorld('data', {
    respuesta: () => ipcRenderer.invoke('data:respuesta'),
    hello: () => ipcRenderer.invoke('hello')
}) */