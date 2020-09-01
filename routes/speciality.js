// ====================================================
//      Routes API: Speciality
//      By ARYA Team ©
// ====================================================

const express = require('express');
const specialityController = require('../controllers/speciality');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las especialidades
// =================================
api.get('/all', specialityController.getSpecialities);

// ====================================
// Todas las especialidades por status
// ====================================
api.get('/all/:status', specialityController.getSpecialitiesByStatus);

// ==============================
// Una especialidad por id
// ==============================
api.get('/:id', specialityController.getSpecialityById);

// ===============================
// Crear nueva especialidad
// ===============================
api.post('/save', [authMiddleware.authenticate], specialityController.saveSpeciality);

// =============================
// Editar especialidad
// =============================
api.put('/:id', [authMiddleware.authenticate], specialityController.updateSpeciality);

// ====================================
// Cambiar estatus de especialidad
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], specialityController.statusSpeciality);

// ================================
// Eliminar especialidad
// ================================
api.delete('/:id', [authMiddleware.authenticate], specialityController.deleteSpeciality);

// =================================
// Especialidades de un tipo persona
// =================================
api.get('/:personTypeId/specialities', specialityController.getSpecialitiesByPersonId);


module.exports = api;