// ====================================================
//      Routes API: General Information
//      By ARYA Team ©
// ====================================================

const express = require('express');
const informationController = require('../controllers/generalinformation');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las información general
// =================================
api.get('/all', informationController.getGeneralInformations);

// ===========================================
// Todas las información general por estatus
// ===========================================
api.get('/all/:status', informationController.getGeneralInformationsByStatus);

// ==============================
// Información general por id
// ==============================
api.get('/:id', informationController.getGeneralInformationById);

// =================================
// Crear nuevo información general
// =================================
api.post('/save', [authMiddleware.authenticate], informationController.saveGeneralInformation);

// =============================
// Editar información general
// =============================
api.put('/:id', [authMiddleware.authenticate], informationController.updateGeneralInformation);

// =======================================
// Cambiar estatus de información general
// =======================================
api.put('/status/:id', [authMiddleware.authenticate], informationController.statusGeneralInformation);

// ================================
// Eliminar información general
// ================================
api.delete('/:id', [authMiddleware.authenticate], informationController.deleteGeneralInformation);

// ==========================================
// Editar imagen de la información general
// ==========================================
api.put('/:id/image', [authMiddleware.authenticate], informationController.updateImage);

// ===================================
// Visibilidad de infortmación en web
// ===================================
api.put('/:id/visibility', [authMiddleware.authenticate], informationController.updateVisibility);

// ===================================
// Información con visibility en true
// ===================================
api.get('/visibility/all/true', informationController.getGeneralInformationsByVisibility);


module.exports = api;