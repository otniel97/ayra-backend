// ====================================================
//      Routes API: WebContent
//      By ARYA Team ©
// ====================================================

const express = require('express');
const webController = require('../controllers/web');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// ==============================
// Obtener web
// ==============================
api.get('/:id', webController.getWeb);

// ===============================
// Crear web
// ===============================
api.post('/save', [authMiddleware.authenticate], webController.saveWeb);

// =============================
// Editar web
// =============================
api.put('/:id', [authMiddleware.authenticate], webController.updateWeb);

// ==================================
// Editar imagen de NOSOTROS
// ==================================
api.put('/:id/we', [authMiddleware.authenticate], webController.updateImageWe);

// ==================================
// Editar imagen de DESCARGA
// ==================================
api.put('/:id/download', [authMiddleware.authenticate], webController.updateImageDownload);

// ==================================
// Editar imagen principal
// ==================================
api.put('/:id/main', [authMiddleware.authenticate], webController.updateImageMain);

// ==================================
// Editar imagen de sección Misión
// ==================================
api.put('/:id/mission', [authMiddleware.authenticate], webController.updateImageMission);

// ==================================
// Editar imagen de sección Visión
// ==================================
api.put('/:id/vision', [authMiddleware.authenticate], webController.updateImageVision);

// ==================================
// Editar imagen de sección Objetivos
// ==================================
api.put('/:id/target', [authMiddleware.authenticate], webController.updateImageTarget);

module.exports = api;