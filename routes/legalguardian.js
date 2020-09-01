// ====================================================
//      Routes API: Representante
//      By ARYA Team ©
// ====================================================

const express = require('express');
const legalGuardianController = require('../controllers/legalguardian');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los representantes
// =================================
api.get('/all', legalGuardianController.getLegalGuardians);

// =================================
// Todos los rrepresentantes por status
// =================================
api.get('/all/:status', legalGuardianController.getLegalGuardiansByStatus);

// ==============================
// Un representante por id
// ==============================
api.get('/:id', legalGuardianController.getLegalGuardianById);

// ===============================
// Crear nuevo representante
// ===============================
api.post('/save', [authMiddleware.authenticate], legalGuardianController.saveLegalGuardian);

// =============================
// Editar representante
// =============================
api.put('/:id', [authMiddleware.authenticate], legalGuardianController.updateLegalGuardian);

// ====================================
// Cambiar estatus de rereprentante
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], legalGuardianController.statusLegalGuardian);

// ================================
// Eliminar representante
// ================================
api.delete('/:id', [authMiddleware.authenticate], legalGuardianController.deleteLegalGuardian);


module.exports = api;