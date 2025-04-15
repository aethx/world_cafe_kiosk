const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMenuItems: () => ipcRenderer.invoke('get-menu-items'),
  placeOrder: (order) => ipcRenderer.invoke('place-order', order)
});
