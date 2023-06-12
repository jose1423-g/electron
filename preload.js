const {ipcRenderer} = require('electron')

window.saveform = {
    register: (data) => ipcRenderer.send('register',data) 
}

window.dataprint = {
  print: (url) => ipcRenderer.invoke('files:print', url),
}