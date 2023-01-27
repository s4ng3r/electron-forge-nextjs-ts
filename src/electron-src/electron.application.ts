import { App, app, BrowserWindow } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class ElectronApplication {
  app: App;

  constructor() {
    this.app = app
  }

  createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      //frame: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
  
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
  }

  async run () {
    if (require("electron-squirrel-startup")) {
      this.app.quit();
    }

    this.app.on('ready', this.createWindow);

    this.app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.app.quit();
      }
    });

    this.app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }
}

export { ElectronApplication };
