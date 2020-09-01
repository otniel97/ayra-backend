// ====================================================
//      Routes API: Timetable
//      By ARYA Team ©
// ====================================================

const express = require('express');
const timetableController = require('../controllers/timetable');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los horarios
// =================================
api.get('/all', timetableController.getTimetables);

// =================================
// Todas los horarios por estatus
// =================================
api.get('/all/:status', timetableController.getTimetablesByStatus);

// ==============================
// Un horario por id
// ==============================
api.get('/:id', timetableController.getTimetableById);

// ===============================
// Crear nuevo horario
// ===============================
api.post('/save', [authMiddleware.authenticate], timetableController.saveTimetable);

// =============================
// Editar horario
// =============================
api.put('/:id', [authMiddleware.authenticate], timetableController.updateTimetable);

// ====================================
// Cambiar estatus de horario
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], timetableController.statusTimetable);

// ================================
// Eliminar horario
// ================================
api.delete('/:id', [authMiddleware.authenticate], timetableController.deleteTimetable);


module.exports = api;