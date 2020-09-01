// ====================================================
//      Routes API: Request Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const requestTypeController = require('../controllers/requesttype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de solicitud
// =================================
api.get('/all', requestTypeController.getRequestTypes);

// ==============================
// Un tipo de solicitud por id
// ==============================
api.get('/:id', requestTypeController.getRequestTypeById);

// =========================================
// Todos los tipos de solicitud por estatus
// =========================================
api.get('/all/:status', requestTypeController.getRequestTypesByStatus);

// ===============================
// Crear nuevo tipo de solicitud
// ===============================
api.post('/save', [authMiddleware.authenticate], requestTypeController.saveRequestType);

// =============================
// Editar tipo de solicitud
// =============================
api.put('/:id', [authMiddleware.authenticate], requestTypeController.updateRequestType);

// ====================================
// Cambiar estatus de tipo de solicitud
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], requestTypeController.statusRequestType);

// ================================
// Eliminar tipo de solicitud
// ================================
api.delete('/:id', [authMiddleware.authenticate], requestTypeController.deleteRequestType);

// =========================================
// Solicitudes de un tipo de solicitud
// =========================================
api.get('/:typeId/requests', [authMiddleware.authenticate], requestTypeController.getRequestsByType);

module.exports = api;