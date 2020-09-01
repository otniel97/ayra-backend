// ====================================================
//      Routes API: Rating Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const ratingController = require('../controllers/rating');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las calificaciones
// =================================
api.get('/all', [authMiddleware.authenticate], ratingController.getRatings);

// =================================
// Todas las calificaciones de citas
// =================================
api.get('/all/services', [authMiddleware.authenticate], ratingController.getRatingsServices);

// =========================================
// Todas las calificaciones de una cita id
// =========================================
api.get('/service/:serviceId', [authMiddleware.authenticate], ratingController.getRatingsByServiceId);

// ============================================
// Todas las calificaciones de eventos detalle
// ============================================
api.get('/all/eventdetails', [authMiddleware.authenticate], ratingController.getRatingsEventDetails);

// ================================================
// Todas las calificaciones de un evento detalle id
// ================================================
api.get('/eventdetail/:eventDetailId', [authMiddleware.authenticate], ratingController.getRatingsByEventDetailId);

// =================================
// Crear nueva calificación
// =================================
api.post('/save', [authMiddleware.authenticate], ratingController.saveRating);

// ====================================================
// Todas las calificaciones de servicios por usuario
// ====================================================
api.get('/services/user/all', [authMiddleware.authenticate], ratingController.getRatingsByServicesByUser);

// =======================================================
// Todas las calificaciones de detalle evento por usuario
// =======================================================
api.get('/eventdetails/user/all', [authMiddleware.authenticate], ratingController.getRatingsByEventDetailsByUser);

module.exports = api;