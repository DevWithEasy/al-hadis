import sevenBin from '7zip-bin';
import { app } from 'electron';
import fs from 'fs';
import { extractFull } from 'node-7z';
import { join } from 'path';

const extactDBFile = () => {
    //zip db file
    const zippedDbFile = join(app.getAppPath(), 'resources', 'db.7z')
    const dbDirectory = join(app.getAppPath(), 'src', 'main', 'server', 'database')

    if (!fs.existsSync(dbDirectory)) {

        fs.mkdirSync(dbDirectory)

        const pathTo7zip = sevenBin.path7za

        extractFull(zippedDbFile, dbDirectory, {
            $bin: pathTo7zip
        })

    }
}

export default extactDBFile