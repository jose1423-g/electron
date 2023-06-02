const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('saveform', {
    register: (data) => ipcRenderer.send('register',data) 
})

contextBridge.exposeInMainWorld('dataprint', {
  print: (url) => ipcRenderer.invoke('files:print', url),
})