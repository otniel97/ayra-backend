// ====================================================
//      Routes API: MedicalCenter
//      By ARYA Team ©
// ====================================================

const express = require('express');
const medicalCenterController = require('../controllers/medicalcenter');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los centros médicos
// =================================
api.get('/all', medicalCenterController.getMedicalCenters);

// =================================
// Todos los centros médicos por estatus
// =================================
api.get('/all/:status', medicalCenterController.getMedicalCentersByStatus);

// ==============================
// Un centro médico por id
// ==============================
api.get('/:id', medicalCenterController.getMedicalCenterById);

// ===============================
// Crear nuevo centro médico
// ===============================
api.post('/save', [authMiddleware.authenticate], medicalCenterController.saveMedicalCenter);

// =============================
// Editar centro médico
// =============================
api.put('/:id', [authMiddleware.authenticate], medicalCenterController.updateMedicalCenter);

// ====================================
// Cambiar estatus de centro médico
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], medicalCenterController.statusMedicalCenter);

// ================================
// Eliminar centro médico
// ================================
api.delete('/:id', [authMiddleware.authenticate], medicalCenterController.deleteMedicalCenter);


module.exports = api;