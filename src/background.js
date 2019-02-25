'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import DataStore from 'nedb'
import { dbInsert, dbFind, dbFindOne, dbUpdate, dbRemove, dbCount } from "./lib/db"

const isDevelopment = process.env.NODE_ENV !== 'production'
let win, db

protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    minWidth: 600,
    height: 600,
    frame: false,
    titleBarStyle: 'hidden',
  })
  win.setTitle('Secret App')
  db = new DataStore({ filename: './data.db' })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  // 加载数据库
  db.loadDatabase(function (err) {
    if (err) {
      win = null
    } else {
      ipcMain.on('insert', (event, query) => dbInsert(db, event, query))
      ipcMain.on('find', (event, query, options) => dbFind(db, event, query, options))
      ipcMain.on('findOne', (event, query) => dbFindOne(db, event, query))
      ipcMain.on('update', (event, query, update, options) => dbUpdate(db, event, query, update, options))
      ipcMain.on('remove', (event, query, options) => dbRemove(db, event, query, options))
      ipcMain.on('count', (event, query) => dbCount(db, event, query))
    }
  })

  ipcMain.on('min', () => win.minimize())
  ipcMain.on('max', () => {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  })
  ipcMain.on('close', () => {
    win.close()
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    await installVueDevtools()
  }
  createWindow()
})

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
