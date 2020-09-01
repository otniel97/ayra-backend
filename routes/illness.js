// ====================================================
//      Routes API: Illness
//      By ARYA Team ©
// ====================================================

const express = require('express');
const illnessController = require('../controllers/illness');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las enfermedades
// =================================
api.get('/all', illnessController.getIllnesses);

// ==============================
// Una enfermedad por id
// ==============================
api.get('/:id', illnessController.getIllnessById);

// ==================================
// Todas las enfermedades por status
// ==================================
api.get('/all/:status', illnessController.getIllnessByStatus);

// ===============================
// Crear nueva enfermedad
// ===============================
api.post('/save', [authMiddleware.authenticate], illnessController.saveIllness);

// =============================
// Editar enfermedad
// =============================
api.put('/:id', [authMiddleware.authenticate], illnessController.updateIllness);

// ====================================
// Cambiar estatus de enfermedad
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], illnessController.statusIllness);

// ================================
// Eliminar enfermedad
// ================================
api.delete('/:id', [authMiddleware.authenticate], illnessController.deleteIllness);


module.exports = api;