// ====================================================
//      Routes API: Event Cancel Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const cancelController = require('../controllers/eventcanceltype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =========================================
// Todos los tipos de cancelación de evento 
// =========================================
api.get('/all', cancelController.getEventCancels);

// =================================
// Una cancelación de evento por id
// =================================
api.get('/:id', cancelController.getEventCancelById);

// ====================================================
// Todos los tipos de cancelación de evento por estatus
// ====================================================
api.get('/all/:status', cancelController.getEventCancelsByStatus);

// =====================================
// Crear tipo de cancelación de evento
// =====================================
api.post('/save', [authMiddleware.authenticate], cancelController.saveEventCancel);

// =====================================
// Editar tipo de cancelación de evento
// =====================================
api.put('/:id', [authMiddleware.authenticate], cancelController.updateEventCancel);

// ================================================
// Cambiar estatus de tipo de cancelación de evento
// ================================================
api.put('/status/:id', [authMiddleware.authenticate], cancelController.statusEventCancel);

// ======================================
// Eliminar tipo de cancelación de evento
// ======================================
api.delete('/:id', [authMiddleware.authenticate], cancelController.deleteEventCancel);

// ==========================================
//Eventos cancelados con id tipo cancelación
// ==========================================
//api.get('/:id/events', cancelController.getEventsByCancel);

module.exports = api;