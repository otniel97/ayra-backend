// ====================================================
//      Routes API: Event Cancel Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const eventController = require('../controllers/event');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =========================================
// Todos los eventos
// =========================================
api.get('/all', eventController.getEvents);

// =================================
// Un evento por id
// =================================
api.get('/:id', eventController.getEventById);

// ====================================================
// Todos los eventos por estatus
// ====================================================
api.get('/all/:status', eventController.getEventsByStatus);

// =====================================
// Crear evento
// =====================================
api.post('/save', [authMiddleware.authenticate], eventController.saveEvent);

// =====================================
// Editar evento
// =====================================
api.put('/:id', [authMiddleware.authenticate], eventController.updateEvent);

// ================================================
// Cambiar estatus de evento
// ================================================
api.put('/status/:id', [authMiddleware.authenticate], eventController.statusEvent);

module.exports = api;