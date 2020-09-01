// ====================================================
//      Routes API: Pharmacy
//      By ARYA Team ©
// ====================================================

const express = require('express');
const pharmacyController = require('../controllers/pharmacy');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las farmacias
// =================================
api.get('/all', pharmacyController.getPharmacies);

// =================================
// Todas las farmacias por estatus
// =================================
api.get('/all/:status', pharmacyController.getPharmaciesByStatus);

// ==============================
// Una farmacia por id
// ==============================
api.get('/:id', pharmacyController.getPharmacyById);

// ===============================
// Crear nueva farmacia
// ===============================
api.post('/save', [authMiddleware.authenticate], pharmacyController.savePharmacy);

// =============================
// Editar farmacia
// =============================
api.put('/:id', [authMiddleware.authenticate], pharmacyController.updatePharmacy);

// ====================================
// Cambiar estatus de farmacia
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], pharmacyController.statusPharmacy);

// ================================
// Eliminar farmacia
// ================================
api.delete('/:id', [authMiddleware.authenticate], pharmacyController.deletePharmacy);


module.exports = api;