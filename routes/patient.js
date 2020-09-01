// ====================================================
//      Routes API: Patient
//      By ARYA Team ©
// ====================================================

const express = require('express');
const patientController = require('../controllers/patient');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los pacientes
// =================================
api.get('/all', patientController.getPatients);

// =================================
// Todos los pacientes por estatus
// =================================
api.get('/all/:status', patientController.getPatientsByStatus);

// ==============================
// Un paciente por id
// ==============================
api.get('/:id', patientController.getPatientById);

// =============================
// Editar paciente
// =============================
api.put('/:id', [authMiddleware.authenticate], patientController.updatePatient);

// ====================================
// Cambiar estatus de paciente
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], patientController.statusPatient);

// ====================================
// Crear ficha médica
// ====================================
api.post('/:patientId/medicalRecord', [authMiddleware.authenticate], patientController.saveMedicalRecord);

// ==============================
// Ficha médica de un paciente
// ==============================
api.get('/:patientId/medicalRecord', patientController.getMedicalRecordByPatientId);

// ======================================
// Actualizar Ficha médica de un paciente
// ======================================
api.put('/:patientId/medicalRecord', [authMiddleware.authenticate], patientController.updateMedicalRecord);

// ====================================
// Crear resumen económico
// ====================================
api.post('/:medicalRecordId/economic', [authMiddleware.authenticate], patientController.saveEconomicStatus);

// ==============================
// Resumen económico de un paciente
// ==============================
api.get('/:medicalRecordId/economic', [authMiddleware.authenticate], patientController.getEconomicStatusByPatientId);

// ============================================
// Actualizar resumen económico de un paciente
// ============================================
api.put('/:medicalRecordId/economic', [authMiddleware.authenticate], patientController.updateEconomicStatus);

module.exports = api;