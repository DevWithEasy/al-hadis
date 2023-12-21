import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import express from 'express'
import createWindow from './app/createWindow'
import errorHandler from './server/midlewares/ErrorHandler'
import applyRoutes from './server/routes/routes'
import cors from 'cors'

//app server
const server = express()

server.use(cors())

//apply routes
applyRoutes(server)


// Error handling middleware
errorHandler(server)

//create server
const serverInstance = server.listen(9999,()=> console.log('Sever i running'))

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Close server before quitting app
app.on('before-quit', () => {
  serverInstance.close((err) => {
    if (err) {
      console.error('Error closing Express server:', err);
    }
    app.quit();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});