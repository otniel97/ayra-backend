// ====================================================
//      Routes API: Appointment Cancel Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const cancelController = require('../controllers/appointmentcanceltype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =======================================
// Todos los tipos de cancelación de cita 
// =======================================
api.get('/all', cancelController.getAppointmentCancels);

// =================================
// Una cancelación de cita  por id
// =================================
api.get('/:id', cancelController.getAppointmentCancelById);

// ==================================================
// Todos los tipos de cancelación de cita por estatus
// ==================================================
api.get('/all/:status', cancelController.getAppointmentCancelsByStatus);

// =====================================
// Crear tipo de cancelación de cita
// =====================================
api.post('/save', [authMiddleware.authenticate], cancelController.saveAppointmentCancel);

// ===================================
// Editar tipo de cancelación de cita
// ===================================
api.put('/:id', [authMiddleware.authenticate], cancelController.updateAppointmentCancel);

// ================================================
// Cambiar estatus de tipo de cancelación de cita
// ================================================
api.put('/status/:id', [authMiddleware.authenticate], cancelController.statusAppointmentCancel);

// ======================================
// Eliminar tipo de cancelación de cita
// ======================================
api.delete('/:id', [authMiddleware.authenticate], cancelController.deleteAppointmentCancel);

// ========================================
//Citas canceladas con id tipo cancelación
// ========================================
api.get('/:id/appointments', cancelController.getAppointmentsByCancel);

module.exports = api;