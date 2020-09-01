// ====================================================
//      Routes API: People
//      By ARYA Team ©
// ====================================================

const express = require('express');
const peopleController = require('../controllers/people');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las personas
// =================================
api.get('/all', peopleController.getPeoples);

// =================================
// Todas las personas por estatus
// =================================
api.get('/all/:status', peopleController.getPeoplesByStatus);

// ==============================
// Una persona por id
// ==============================
api.get('/:id', peopleController.getPeopleById);

// =============================
// Editar persona
// =============================
api.put('/:id', [authMiddleware.authenticate], peopleController.updatePeople);

// ====================================
// Cambiar estatus de persona
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], peopleController.statusPeople);

// ==============================
// Personas con una especialidad
// ==============================
api.get('/speciality/:id', [authMiddleware.authenticate], peopleController.getPeoplesBySpecialityId);

// ==============================
// Pacientes de un person id
// ==============================
api.get('/:personId/patients', [authMiddleware.authenticate], peopleController.getPatientsByPeopleId);

module.exports = api;