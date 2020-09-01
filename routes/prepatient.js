// ====================================================
//      Routes API: PrePatient
//      By ARYA Team ©
// ====================================================

const express = require('express');
const prePatientController = require('../controllers/prepatient');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los pre pacientes
// =================================
api.get('/all', prePatientController.getPrePatients);

// ===============================================
// Todos los pre pacientes por status
//(pending, accepted, canceled, approved, rejected)
// ===============================================
api.get('/all/:status', prePatientController.getPrePatientsByStatus);

// ==============================
// Un pre paciente por id
// ==============================
api.get('/:id', prePatientController.getPrePatientById);

// ===============================
// Crear nuevo pre paciente
// ===============================
api.post('/save', prePatientController.savePrePatient);

// ================================================
// Actualizar status
//pending, accepted o canceled, approved rejected
// ================================================
api.put('/:id/:status', [authMiddleware.authenticate], prePatientController.statusPrePatient);

module.exports = api;