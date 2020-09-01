// ====================================================
//      Routes API: Bitacora
//      By ARYA Team ©
// ====================================================

const express = require('express');
const bitacoraController = require('../controllers/bitacora');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Toda la bitacora
// =================================
api.get('/all', [authMiddleware.authenticate], bitacoraController.getBitacora);

// =================================
// Bitacora por user id
// =================================
api.get('/:userId', [authMiddleware.authenticate], bitacoraController.getBitacoraByUserId);

// =================================
// Bitacora por modelo
// =================================
api.get('/model/:modelName', [authMiddleware.authenticate], bitacoraController.getBitacoraByModel);

// =================================
// Bitacora por fechas
// =================================
api.post('/all/date/all', [authMiddleware.authenticate], bitacoraController.getBitacoraByDate);


module.exports = api;