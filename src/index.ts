import { app, shell, BrowserWindow, session, Menu, ipcMain, webContents } from 'electron';
import server from '../server/server';
import path from 'path';
import { joinPaths } from 'react-router/lib/router';
// import fs from 'fs';
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

server.listen();

let mainWindow:Electron.BrowserWindow;

const createWindow = (): void => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({ responseHeaders: Object.assign({
          "Content-Security-Policy": [ "default-src 'self'" ]
      }, details.responseHeaders)});
  });
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 1600,
    show:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // This code below is not working, for now.
      // preload: path.join(__dirname, "preload.ts"),
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // shell.openExternal("https://github.com/login/oauth/authorize?scope=user&client_id=e4a70dc5fa8c873142f8");

  // To have a smoother opening, it will wait until the page fully loaded then will shot the main window to the user.
  mainWindow.on ("ready-to-show", mainWindow.show)

  const mainMenu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
      {
        label: 'Exit app',
        click() {
          app.quit()
        }
      }
      ]
    }
  ])

  Menu.setApplicationMenu(mainMenu);
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// IPC ADDITIONAL PART

ipcMain.on('message', (event, args)=>{
  console.log("MESSAGE HAS BEEN SENT");
  console.log(args);
})

ipcMain.on('number', (event, args)=>{
  console.log("NEW NUMBER IS", args);
  event.reply("reply", "I DONT LIKE THIS NUMBER!")
})

ipcMain.on('to-index',(event, args) => {
  console.log('Main process reached');
  shell.openExternal("https://github.com/login/oauth/authorize?scope=user&client_id=e4a70dc5fa8c873142f8");
});

// function handleSetTitle (event:any, title:string) {
//   const webContents = event.sender
//   const win = BrowserWindow.fromWebContents(webContents)
//   win.setTitle(title)
// }


