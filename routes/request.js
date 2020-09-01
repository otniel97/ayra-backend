// ====================================================
//      Routes API: Request
//      By ARYA Team ©
// ====================================================

const express = require('express');
const requestController = require('../controllers/request');
const authMiddleware = require('../middlewares/auth');
const api = express.Router();

// =================================
// Todas las solicitudes
// =================================
api.get('/all', authMiddleware.authenticate, requestController.getRequests);

// =================================
// Todas las solicitudes por estatus
// =================================
api.get('/all/:status', authMiddleware.authenticate, requestController.getRequestsByStatus);

// ==============================
// Una solicitud por id
// ==============================
api.get('/:id', authMiddleware.authenticate, requestController.getRequestById);

// ===============================
// Crear nueva solicitud
// ===============================
api.post('/save', authMiddleware.authenticate, requestController.saveRequest);

// ====================================
// Aceptar solicitud
// ====================================
api.put('/:id/accept', authMiddleware.authenticate, requestController.acceptRequest);

// ====================================
// Rechazar solicitud
// ====================================
api.put('/:id/cancel', authMiddleware.authenticate, requestController.cancelRequest);

// ===================================
// Solicitudes de un tipo de evento
// ===================================
api.get('/eventtype/:activityTypeId', authMiddleware.authenticate, requestController.getRequestsByEventType);

// ===================================
// Solicitudes de un tipo de solicitud
// ===================================
api.get('/requesttype/:requestTypeId', authMiddleware.authenticate, requestController.getRequestsByRequestType);

// ===================================
// Solicitudes de un usuario
// ===================================
api.get('/user/requests', authMiddleware.authenticate, requestController.getRequestsByUser);

module.exports = api;