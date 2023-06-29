const {ipcRenderer} = require('electron')

window.saveform = {
    register: (data) => ipcRenderer.send('register',data),
}

window.filedelete = {
  delete: (data) => ipcRenderer.send('delete',data)
}

window.dataprint = {
  print: (url) => ipcRenderer.invoke('files:print', url),
}

window.closeapp = {
  close: () => ipcRenderer.invoke('closeapp:close')
}