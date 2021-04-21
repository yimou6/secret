'use strict'

import {app, BrowserWindow, ipcMain, protocol} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import Nedb from 'nedb'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
// 方案必须在应用程序准备就绪之前注册
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#f0f0f0',
    center: true,
    resizable: false,
    fullscreen: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.join(__dirname, 'preload.js')
    }
  })



  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await win.loadURL('app://./index.html')
  }
}
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // 创建窗口
  await createWindow()
  // 加载数据库
  const db = loadDatabase()

  ipcMain.on('submit-secret', (event, args) => {
    db.insert(Object.assign(args, {
      secret: true,
      update: new Date()
    }), (err, document) => {
      if (err) {
        event.reply('submit-secret-reply', { code: 0, msg: '保存失败!', err })
      } else {
        event.reply('submit-secret-reply', { code: 1, msg: '保存成功!' })
      }
    })
  })

  ipcMain.on('secret-list', (event, args) => {
    const { type } = args
    db.find({ type, secret: true }, (err: Error | null, doc: any[]) => {
      if (err) {
        event.reply('submit-list-reply', { code: 0, msg: '查询失败!', err })
      } else {
        event.reply('submit-list-reply', { code: 1, msg: '查询成功!', data: doc })
      }
    })
  })

  ipcMain.on('type-list', (event, args) => {
    db.find({ secret: false }, (err: Error | null, doc: any[]) => {
      if (err) {
        event.reply('type-list-reply', { code: 0, msg: '查询失败!', err })
      } else {
        event.reply('type-list-reply', { code: 1, msg: '查询成功!', data: doc })
      }
    })
  })
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
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

function loadDatabase() {
  return new Nedb({
    filename: path.join(app.getPath('userData'), 'data.ggg'),
    autoload: true
  })
}


