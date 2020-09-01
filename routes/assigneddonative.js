// ====================================================
//      Routes API: Asignned Donatives
//      By ARYA Team ©
// ====================================================

const express = require('express');
const assignedDonativeController = require('../controllers/assigneddonative');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Crear una asignacion
// =================================
api.post('/save', [authMiddleware.authenticate], assignedDonativeController.saveAssignedDonation);

// ==========================================
// Obtener todas las asignaciones
// ==========================================
api.get('/all', assignedDonativeController.getAssignedDonatives);

// ==========================================
// Obtener asignaciones por status
// ==========================================
api.get('/all/:status', assignedDonativeController.getAssignedDonativesByStatus);

// ==========================================
// Obtener donativos asignados a un paciente
// ==========================================
api.get('/patient/:id', assignedDonativeController.getAssignedDonativesByPatient);

// ==========================================
// Obtener asignaciones por donativo
// ==========================================
api.get('/donative/:id', assignedDonativeController.getAssignedDonativesByDonative);

// ====================================
// Cambiar estatus de asignacion
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], assignedDonativeController.statusAssignedDonative);

module.exports = api;