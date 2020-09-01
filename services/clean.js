// Limpiar la base de datos (Asíncrono)

require('../config/env.js')
require('dotenv').config();
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const username = config.username;
const password = config.password;
const host = config.host;
const database = config.database;

const connection = 'postgresql://' + username + ':' + password + '@' + host + ':5432/' + database;

const scriptBackup = 'pg_dump -f ./public/database/tmp.tar -s -F t ' + connection;
const scriptRestore = 'pg_restore --dbname=' + connection + ' -c -Ft ./public/database/tmp.tar';

async function clean(req, res) {
    console.log('Iniciando limpieza de la base de datos...');
    exec(
        scriptBackup,
        (error, stdout, stderr) => {
            if (error)
                errorMsg(res, 500, 'Ha ocurrido un error', error);
            console.log(stdout);
            console.log('Paso 1 completado.');
            exec(
                scriptRestore,
                (error, stdout, stderr) => {
                    if (error)
                        errorMsg(res, 500, 'Ha ocurrido un error', error);
                    console.log(stdout);
                    console.log('Paso 2 completado.');
                    fs.unlink('./public/database/tmp.tar', (err) => {
                        if (err)
                            errorMsg(res, 500, 'Ha ocurrido un error', err);
                        console.log('Limpieza completada.');
                        saveBitacora('Backup', 0, 'base de datos', 'clean');
                        successMsg(res, 200, 'Limpieza completada.', 'Base de datos limpia');
                    });
                }
            );
        }
    );

}

module.exports = {
    clean
}