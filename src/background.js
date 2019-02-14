'use strict'

import { app, protocol, BrowserWindow, remote, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import DataStore from 'nedb'
import path from 'path'
import { insert, find, findOne, update, remove, count } from "./lib/db"

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, db

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    db = new DataStore({ filename: './data.db' })
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // db = new DataStore({
    //   filename: path.join(remote.app.getPath('userData'), '/data.db')
    // })
    db = new DataStore({ filename: './data.db' })
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    win.webContents.openDevTools()
  }

  // 加载数据库
  db.loadDatabase(function (err) {
    if (err) {
      win = null
    } else {
      ipcMain.on('insert', (event, query) => insert(db, event, query))
      ipcMain.on('find', (event, query, options) => find(db, event, query, options))
      ipcMain.on('findOne', (event, query) => findOne(db, event, query))
      ipcMain.on('update', (event, query) => update(db, event, query))
      ipcMain.on('remove', (event, query) => remove(db, event, query))
      ipcMain.on('count', (event, query) => count(db, event, query))
    }
  })

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
