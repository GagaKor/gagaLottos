"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { remove } from "./utils/excel";
import { autoUpdater } from "electron-updater";
const isDevelopment = process.env.NODE_ENV !== "production";
console.log(process.env.NODE_ENV);
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: false /*standard: true*/ } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080,
    height: 880,
    autoHideMenuBar: process.env.NODE_ENV === "production" ? true : false,
    webPreferences: {
      webSecurity: false,
      worldSafeExecuteJavaScript: true, // required for Electron 12+
      contextIsolation: false, // required for Electron 12+
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  remove();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

//updater

//dev????????? ??? ???????????? ??????
// autoUpdater.forceDevUpdateConfig = true;
let check = false;

ipcMain.on("check_update", async () => {
  await autoUpdater.checkForUpdates();
});

ipcMain.on("UPDATE_MSG", (event) => {
  event.reply("checkResult", check);
});

autoUpdater.setFeedURL({
  provider: "github",
  repo: "gagaLottos",
  owner: "GagaKor",
});

autoUpdater.on("error", function (error) {
  console.log(error);
});

// ???????????? ??????
autoUpdater.on("checking-for-update", async () => {
  console.log("Checking-for-update");
});

// ??????????????? ????????? ?????? ???
autoUpdater.on("update-available", async () => {
  console.log("A new update is available");
});

// ??????????????? ????????? ?????? ???
autoUpdater.on("update-not-available", async () => {
  check = true;
  console.log("update-not-available");
});

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});
