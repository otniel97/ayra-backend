// ====================================================
//      Routes API: Mediciones
//      By ARYA Team ©
// ====================================================

const express = require('express');
const glucoseMeasurementController = require('../controllers/glucosemeasurement');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las medidas del paciente registrado
// =================================
api.get('/all', [authMiddleware.authenticate], glucoseMeasurementController.getGlucoseMeasurements);

// =========================================================
// Todas las medidas del paciente registrado de día actual
// =========================================================
api.get('/all/today/measurements', [authMiddleware.authenticate], glucoseMeasurementController.getGlucoseMeasurementsToday);

// =================================
// Todas las medidas de un paciente
// =================================
api.get('/patient/:id', [authMiddleware.authenticate], glucoseMeasurementController.getGlucoseMeasurementsOfPatient);

// ======================================================
// Todas las medidas de un paciente por rango de fechas
// ======================================================
api.post('/patient/:id/bydates', [authMiddleware.authenticate], glucoseMeasurementController.getGlucoseMeasurementsOfPatientByDates);

// =================================
// Detalle de una medicion
// =================================
api.get('/:id', [authMiddleware.authenticate], glucoseMeasurementController.getGlucoseMeasurementById);

// ===============================
// Crear nueva medicion
// ===============================
api.post('/save', [authMiddleware.authenticate], glucoseMeasurementController.saveGlucoseMeasurement);

// ===============================
// Actualizar medicion
// ===============================
api.put('/:id', [authMiddleware.authenticate], glucoseMeasurementController.updateGlucoseMeasurement);


module.exports = api;