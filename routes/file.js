// ======================================================
//      Routes API: Files (images, apk and others files)
//      By ARYA Team ©
// ======================================================

const express = require('express');
const uploadController = require('../controllers/upload');
const api = express.Router();

// ===========================================================
// Obtener archivos type: modelo, fileName: nombre de archivo
// ===========================================================
api.get('/:type/:fileName', uploadController.getFile);

module.exports = api;