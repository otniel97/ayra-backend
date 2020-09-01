// ====================================================
//      Routes API: Event Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const eventTypeController = require('../controllers/eventtype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de evento
// =================================
api.get('/all', eventTypeController.getEventTypes);

// ==============================
// Un tipo de evento por id
// ==============================
api.get('/:id', eventTypeController.getEventTypeById);

// ======================================
// Todos los tipos de evento por estatus
// ======================================
api.get('/all/:status', eventTypeController.getEventTypesByStatus);

// ===============================
// Crear nuevo tipo de evento
// ===============================
api.post('/save', [authMiddleware.authenticate], eventTypeController.saveEventType);

// =============================
// Editar tipo de evento
// =============================
api.put('/:id', [authMiddleware.authenticate], eventTypeController.updateEventType);

// ====================================
// Cambiar estatus de tipo de evento
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], eventTypeController.statusEventType);

// ================================
// Eliminar tipo de evento
// ================================
api.delete('/:id', [authMiddleware.authenticate], eventTypeController.deleteEventType);

// =========================================
// Eventos de un tipo de evento
// =========================================
api.get('/:typeId/events', [authMiddleware.authenticate], eventTypeController.getEventsByType);

module.exports = api;