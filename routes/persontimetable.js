// ====================================================
//      Routes API: SystemFunction
//      By ARYA Team ©
// ====================================================

const express = require('express');
const personTimetable = require('../controllers/persontimetable');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Obtener personas con sus horarios
// =================================
api.get('/all', personTimetable.getPeopleTimetables);

// =================================
// Agregar horarios a persona
// =================================
api.post('/add', [authMiddleware.authenticate], personTimetable.addTimetableToPerson);

// =================================
// Obtener horarios de persona
// =================================
api.get('/:id', personTimetable.getPersonTimetablesById);

// =================================
// Actualizar horarios de persona
// =================================
api.put('/update/:id', [authMiddleware.authenticate], personTimetable.updatePersonTimetable);

// =================================
// Elminar horario de persona
// =================================
api.delete('/delete/:id', [authMiddleware.authenticate], personTimetable.deletePersonTimetables);

module.exports = api;