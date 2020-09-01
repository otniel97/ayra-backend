// ====================================================
//      Routes API: Appointment
//      By ARYA Team ©
// ====================================================

const express = require('express');
const appointmentController = require('../controllers/appointment');
const authMiddleware = require('../middlewares/auth');
const api = express.Router();

// =================================
// Todos las citas
// =================================
api.get('/all', [authMiddleware.authenticate], appointmentController.getAppointments);

// ==============================
// Una cita por id
// ==============================
api.get('/:id', [authMiddleware.authenticate], appointmentController.getAppointmentById);

// ======================================
// Todas las citas por estatus
// ======================================
api.get('/all/:status', [authMiddleware.authenticate], appointmentController.getAppointmentsByStatus);

// =====================================
// Obtener horarios de citas disponibles
// =====================================
api.post('/available/timetables', [authMiddleware.authenticate], appointmentController.availableTimetables);

// =====================================
// Crear cita
// =====================================
api.post('/saveAppointment', [authMiddleware.authenticate], appointmentController.saveAppointment);

// ======================================
// Obtener todas las citas por id doctor
// ======================================
api.get('/person/:personId/all', [authMiddleware.authenticate], appointmentController.getAppointmentsByPerson);

// ====================================
// Obtener citas por id doctor y status
// ====================================
api.get('/personstatus/:personId/:status', [authMiddleware.authenticate], appointmentController.getAppointmentsByPersonByStatus);

// =========================================
// Obtener citas por id doctor y tipo cita
// =========================================
api.get('/persontype/:personId/:typeId', [authMiddleware.authenticate], appointmentController.getAppointmentsByPersonByType);

// ===========================================================
// Obtener citas por id paciente (solo para usuario paciente)
// ===========================================================
api.get('/patient/:patientId/all', [authMiddleware.authenticate], appointmentController.getAppointmentsByPatient);

// ====================================
// Obtener citas por id paciente y status
// ====================================
api.get('/patientstatus/:patientId/:status', [authMiddleware.authenticate], appointmentController.getAppointmentsByPatientByStatus);

// =====================================
// Crear registro consulta cita
// =====================================
api.post('/history/:appointmentId', [authMiddleware.authenticate], appointmentController.saveAppointmentHistory);

// =====================================
// Cancelar cita
// =====================================
api.put('/:appointmentId/cancel', [authMiddleware.authenticate], appointmentController.cancelAppointment);

// ====================================
// Obtener registro consulta por id
// ====================================
api.get('/appointmenthistory/:id/history', [authMiddleware.authenticate], appointmentController.getAppointmentHistoryById);


module.exports = api;