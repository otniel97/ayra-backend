// ====================================================
//      Routes API: MessageType
//      By ARYA Team ©
// ====================================================

const express = require('express');
const messageTypeController = require('../controllers/messagetype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de mensaje
// =================================
api.get('/all', messageTypeController.getMessageTypes);

// ========================================
// Todos los tipos de mensaje por estatus
// ========================================
api.get('/all/:status', messageTypeController.getMessageTypesByStatus);

// ==============================
// Un tipo de mensaje por id
// ==============================
api.get('/:id', messageTypeController.getMessageTypeById);

// ===============================
// Crear nuevo tipo de mensaje
// ===============================
api.post('/save', [authMiddleware.authenticate], messageTypeController.saveMessageType);

// =============================
// Editar tipo de mensaje
// =============================
api.put('/:id', [authMiddleware.authenticate], messageTypeController.updateMessageType);

// ====================================
// Cambiar estatus de tipo mensaje
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], messageTypeController.statusMessageType);

// ================================
// Eliminar tipo de mensaje
// ================================
api.delete('/:id', [authMiddleware.authenticate], messageTypeController.deleteMessageType);

// =========================================
// Mensaje de un tipo de mensaje
// =========================================
api.get('/:typeId/messages', [authMiddleware.authenticate], messageTypeController.getMessagesByType);

module.exports = api;