// ====================================================
//      Routes API: Diabetes Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const diabetesController = require('../controllers/diabetestype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de cita
// =================================
api.get('/all', diabetesController.getDiabetesTypes);

// ==============================
// Un tipo de cita por id
// ==============================
api.get('/:id', diabetesController.getDiabetesTypeById);

// ======================================
// Todos los tipos de cita por estatus
// ======================================
api.get('/all/:status', diabetesController.getDiabetesTypesByStatus);

// ===============================
// Crear nuevo tipo de cita
// ===============================
api.post('/save', [authMiddleware.authenticate], diabetesController.saveDiabetesType);

// =============================
// Editar tipo de cita
// =============================
api.put('/:id', [authMiddleware.authenticate], diabetesController.updateDiabetesType);

// ====================================
// Cambiar estatus de tipo de cita
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], diabetesController.statusDiabetesType);

// ================================
// Eliminar tipo de cita
// ================================
api.delete('/:id', [authMiddleware.authenticate], diabetesController.deleteDiabetesType);

// =========================================
// CPacientes de un tipo de diabetes
// =========================================
api.get('/:diabetesId/patients', [authMiddleware.authenticate], diabetesController.getPatientsByDiabetesType);

module.exports = api;