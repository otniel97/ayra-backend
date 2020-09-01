// Hacer Backup de la base de datos con PG_DUMP

require('../config/env.js')
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const username = config.username;
const password = config.password;
const host = config.host;
const database = config.database;

const filename = 'backup';
const date = new Date();

function convertDate(d) {
    if (d < 10)
        return '0' + d.toString();
    else
        return d.toString();
}

async function backup(req, res) {
    const dateString = convertDate(date.getFullYear()) + convertDate(date.getMonth() + 1) + convertDate(date.getDate()) + convertDate(date.getHours()) + convertDate(date.getMinutes()) + convertDate(date.getSeconds());
    const filenameFull = filename + '_' + dateString + '.tar';
    console.log('Copia de seguridad iniciada el: ' + date.toString());

    const connection = 'postgresql://' + username + ':' + password + '@' + host + ':5432/' + database;

    const script = 'pg_dump -f ./public/database/' + filenameFull + ' -F t ' + connection;
    let pathBackup = path.resolve(__dirname, `../public/database/${filenameFull}`);
    saveBitacora('Backup', 0, filenameFull, 'create', req.user.id);

    exec(
        script,
        (error, stdout, stderr) => {
            if (error) {
                errorMsg(res, 500, 'Ha ocurrido un error', error);
            }
            console.log(stdout);
            console.log('Copia de seguridad completada.');
            console.log('Archivo creado: ' + filenameFull);
            console.log(pathBackup);
            res.download(pathBackup, filenameFull, (err) => {
                if (err) {
                    errorMsg(res, 500, 'Ha ocurrido un error', error);
                }
            })
        }
    );
}

async function getFiles(files) {
    const stateAsync = promisify(fs.stat);
    let pathBackup = path.resolve(__dirname, '../public/database/');
    let backups = [];

    for (file of files) {
        await stateAsync(`${pathBackup}/${file}`)
            .then(data => {
                let backupInfo = { name: file, date: data.birthtime, size: data.size };
                backups.push(backupInfo);
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error',
                    error: err.message
                });
            });
    }
    return backups
}

async function getBackups(req, res) {
    let pathBackup = path.resolve(__dirname, '../public/database/');
    fs.readdir(pathBackup, async function(err, files) {
        if (err)
            errorMsg(res, 500, 'Ha ocurrido un error', err);
        let backups = await getFiles(files)
        successMsg(res, 200, "Correcto", backups);
    });
}
module.exports = {
    backup,
    getBackups
}