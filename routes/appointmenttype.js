// ====================================================
//      Routes API: Appointment Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const appointmentTypeController = require('../controllers/appointmenttype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de cita
// =================================
api.get('/all', appointmentTypeController.getAppointmentTypes);

// ==============================
// Un tipo de cita por id
// ==============================
api.get('/:id', appointmentTypeController.getAppointmentTypeById);

// ======================================
// Todos los tipos de cita por estatus
// ======================================
api.get('/all/:status', appointmentTypeController.getAppointmentTypesByStatus);

// ===============================
// Crear nuevo tipo de cita
// ===============================
api.post('/save', [authMiddleware.authenticate], appointmentTypeController.saveAppointmentType);

// =============================
// Editar tipo de cita
// =============================
api.put('/:id', [authMiddleware.authenticate], appointmentTypeController.updateAppointmentType);

// ====================================
// Cambiar estatus de tipo de cita
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], appointmentTypeController.statusAppointmentType);

// ================================
// Eliminar tipo de cita
// ================================
api.delete('/:id', [authMiddleware.authenticate], appointmentTypeController.deleteAppointmentType);

// =========================================
// Citas de un tipo de cita
// =========================================
api.get('/:id/appointments', appointmentTypeController.getAppointmentsByType);

module.exports = api;