import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const url = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, 'dist/index.html')}`;

  console.log("Creating Electron window in", isDev ? "DEV" : "PROD", "mode");

  mainWindow.loadURL(url); // <-- This must come AFTER url is defined

  if (isDev) mainWindow.webContents.openDevTools();
}



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

import { ipcMain } from 'electron';

ipcMain.handle('get-menu-items', async () => {
  // You could later pull this from a DB
  return [
    { id: 1, name: 'Hot Dog', description: 'Classic all-beef hot dog', price: 1.50 },
    { id: 2, name: 'Soda', description: 'Refreshing soda can', price: 1.00 },
    { id: 3, name: 'Pizza Slice', description: 'Cheesy pepperoni slice', price: 2.50 },
    { id: 4, name: 'Pretzel', description: 'Warm soft pretzel', price: 2.00 },
  ];
});

ipcMain.handle('place-order', async (event, order) => {
  console.log('Order received:', order);
  // You can write to a file, save to SQLite, etc.
});
