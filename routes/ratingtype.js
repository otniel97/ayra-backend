// ====================================================
//      Routes API: Rating Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const ratingTypeController = require('../controllers/ratingtype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de calificación
// =================================
api.get('/all', ratingTypeController.getRatingTypes);

// ==============================
// Un tipo de calificación por id
// ==============================
api.get('/:id', ratingTypeController.getRatingTypeById);

// =============================================
// Todos los tipos de calificación por estatus
// =============================================
api.get('/all/:status', ratingTypeController.getRatingTypesByStatus);

// ======================================================
// Todos los tipos de calificación según una entidad
// enviar por parametro 'actividades' o 'citas'
// ======================================================
api.get('/entity/:entity/all', ratingTypeController.getRatingTypesByEntity);

// =================================
// Crear nuevo tipo de calificación
// =================================
api.post('/save', [authMiddleware.authenticate], ratingTypeController.saveRatingType);

// =============================
// Editar tipo de calificación
// =============================
api.put('/:id', [authMiddleware.authenticate], ratingTypeController.updateRatingType);

// =========================================
// Cambiar estatus de tipo de calificación
// =========================================
api.put('/status/:id', [authMiddleware.authenticate], ratingTypeController.statusRatingType);

// ================================
// Eliminar tipo de calificación
// ================================
api.delete('/:id', [authMiddleware.authenticate], ratingTypeController.deleteRatingType);

// ======================================================
// Todos los tipos de calificación para actividades
// según detalle evento id
// ======================================================
api.get('/eventdetail/:eventDetailId/all', ratingTypeController.getRatingTypeByEventDetail);

// ======================================================
// Todos los tipos de calificación para citas
// según servicio id
// ======================================================
api.get('/service/:serviceId/all', ratingTypeController.getRatingTypeByService);

module.exports = api; 