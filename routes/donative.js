// ====================================================
//      Routes API: Donative
//      By ARYA Team ©
// ====================================================

const express = require('express');
const donativeController = require('../controllers/donative');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los donativos
// =================================
api.get('/all', donativeController.getDonatives);

// =================================
// Todos los donativos por estatus
// =================================
api.get('/all/:status', donativeController.getDonativesByStatus);

// ==============================
// Un donativo por id
// ==============================
api.get('/:id', donativeController.getDonativeById);

// ===============================
// Crear nuevo donativo
// ===============================
api.post('/save', [authMiddleware.authenticate], donativeController.saveDonative);

// =============================
// Editar donativo
// =============================
api.put('/:id', [authMiddleware.authenticate], donativeController.updateDonative);

// ====================================
// Cambiar estatus de donativo
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], donativeController.statusDonative);

// ================================
// Eliminar donativo
// ================================
api.delete('/:id', [authMiddleware.authenticate], donativeController.deleteDonative);

// =========================================
// Donaciones de un donativo
// =========================================
api.get('/:donativeId/donations', donativeController.getDonationsByDonative);

module.exports = api;