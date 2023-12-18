import { app, BrowserWindow, shell } from "electron"
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'
import { is } from "@electron-toolkit/utils"
import extactDBFile from "./extractDBFile"

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(app.getAppPath(), 'preload', 'index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    extactDBFile()

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(app.getAppPath(), 'src', 'renderer', 'index.html'))
    }
}

export default createWindow