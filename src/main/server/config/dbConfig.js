import { app } from 'electron'
import fs from 'fs'
import {join} from 'path'

import con from 'sqlite3'

const sqlite3 = con.verbose()

const dbDirectory = join(app.getAppPath(), 'src', 'main', 'server', 'database')

const mainFilePath = join(app.getAppPath(), 'src', 'main', 'server', 'database', 'hadith_bn.db')

const demoFilePath = join(app.getAppPath(), 'resources', 'hadith_bn.db')

const dbFile = !fs.existsSync(dbDirectory) ? demoFilePath : mainFilePath

const db = new sqlite3.Database(dbFile)

export default db