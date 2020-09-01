// ====================================================
//      Routes API: Donation Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const donationTypeController = require('../controllers/donationtype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los tipos de donaciones
// =================================
api.get('/all', donationTypeController.getDonationTypes);

// ==============================
// Un tipo de donación por id
// ==============================
api.get('/:id', donationTypeController.getDonationTypeById);

// ==============================
// Tipos de donaciones por status
// ==============================
api.get('/all/:status', donationTypeController.getDonationTypesByStatus);

// ===============================
// Crear nuevo tipo de donación
// ===============================
api.post('/save', [authMiddleware.authenticate], donationTypeController.saveDonationType);

// =============================
// Editar tipo de donación
// =============================
api.put('/:id', [authMiddleware.authenticate], donationTypeController.updateDonationType);

// ====================================
// Cambiar estatus de tipo de donación
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], donationTypeController.statusDonationType);

// ================================
// Eliminar tipo de donación
// ================================
api.delete('/:id', [authMiddleware.authenticate], donationTypeController.deleteDonationType);

// =========================================
// Donativos de un tipo de donación
// =========================================
api.get('/:typeId/donatives', [authMiddleware.authenticate], donationTypeController.getDonationsByType);

module.exports = api;