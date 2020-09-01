// Restaurar respaldo con PG_RESTORE

require('../config/env.js')
require('dotenv').config();
const path = require('path');
const { exec } = require('child_process');
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const username = config.username;
const password = config.password;
const host = config.host;
const database = config.database;

let validExtention = ['tar'];

async function restore(req, res) {
    let fileUploaded = '';

    if (req.body.file) {
        fileUploaded = req.body.file;
        importFile(req, res, fileUploaded)
    } else if (req.files) {
        fileUpload = req.files.file;
        let nameTokenFile = fileUpload.name.split('.');
        let extention = nameTokenFile[nameTokenFile.length - 1].toLowerCase();
        if (validExtention != extention) {
            return res.status(400).json({
                ok: false,
                message: 'Las extensión de archio válida es .tar'
            });
        }
        fileUpload.mv(`public/database/${fileUpload.name}`, (err) => {
            if (err)
                errorMsg(res, 500, 'Ha ocurrido un error', err);
            fileUploaded = fileUpload.name;
            importFile(req, res, fileUploaded)
        });
    }
}

async function importFile(req, res, file) {
    const connection = 'postgresql://' + username + ':' + password + '@' + host + ':5432/' + database;
    const script = 'pg_restore --dbname=' + connection + ' -c -Ft ./public/database/' + file;
    console.log('Iniciando importación de la base de datos. Por favor espere...');
    exec(
        script,
        (error, stdout, stderr) => {
            if (error) {
                errorMsg(res, 500, 'Ha ocurrido un error', error);
            }
            console.log(stdout);
            console.log('Restauración completada.');
            saveBitacora('Backup', 0, file, 'restore, import', req.user.id);
            successMsg(res, 200, 'Importación completada.', `${file} importado`);
        }
    );
}

module.exports = {
    restore
}