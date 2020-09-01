// ====================================================
//      Routes API: Measurement Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const typeController = require('../controllers/measurementtype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de medición
// =================================
api.get('/all', typeController.getMeasurementTypes);

// ==============================
// Un tipo de medición por id
// ==============================
api.get('/:id', typeController.getMeasurementTypeById);

// =======================================
// Todos los tipos de medición por estatus
// =======================================
api.get('/all/:status', typeController.getMeasurementTypesByStatus);

// ===============================
// Crear nuevo tipo de medición
// ===============================
api.post('/save', [authMiddleware.authenticate], typeController.saveMeasurementType);

// =============================
// Editar tipo de medición
// =============================
api.put('/:id', [authMiddleware.authenticate], typeController.updateMeasurementType);

// ====================================
// Cambiar estatus de tipo de medición
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], typeController.statusMeasurementType);

// ================================
// Eliminar tipo de medición
// ================================
api.delete('/:id', [authMiddleware.authenticate], typeController.deleteMeasurementType);

module.exports = api;