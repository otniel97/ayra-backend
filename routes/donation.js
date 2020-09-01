// ====================================================
//      Routes API: Donation
//      By ARYA Team ©
// ====================================================

const express = require('express');
const donationController = require('../controllers/donation');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las donaciones
// =================================
api.get('/all', donationController.getDonations);

// =================================
// Todas las donaciones por estatus
// =================================
api.get('/all/:status', donationController.getDonationsByStatus);

// ==============================
// Una donación por id
// ==============================
api.get('/:id', donationController.getDonationById);

// ===============================
// Crear nueva donación
// ===============================
api.post('/save', [authMiddleware.authenticate], donationController.saveDonation);

// =============================
// Editar donación
// =============================
api.put('/:id', [authMiddleware.authenticate], donationController.updateDonation);

// ====================================
// Cambiar estatus de donación
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], donationController.statusDonation);

// ================================
// Eliminar donación
// ================================
api.delete('/:id', [authMiddleware.authenticate], donationController.deleteDonation);


module.exports = api;