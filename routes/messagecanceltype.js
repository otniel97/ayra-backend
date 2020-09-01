// ====================================================
//      Routes API: Message Cancel Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const cancelController = require('../controllers/messagecanceltype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =========================================
// Todos los tipos de cancelación de mensaje 
// =========================================
api.get('/all', cancelController.getMessageCancels);

// =================================
// Una cancelación de mensaje por id
// =================================
api.get('/:id', cancelController.getMessageCancelById);

// =======================================================
// Todos los tipos de cancelación de mensaje por estatus
// =======================================================
api.get('/all/:status', cancelController.getMessageCancelsByStatus);

// =====================================
// Crear tipo de cancelación de mensaje
// =====================================
api.post('/save', [authMiddleware.authenticate], cancelController.saveMessageCancel);

// ======================================
// Editar tipo de cancelación de mensaje
// ======================================
api.put('/:id', [authMiddleware.authenticate], cancelController.updateMessageCancel);

// ==================================================
// Cambiar estatus de tipo de cancelación de mensaje
// ==================================================
api.put('/status/:id', [authMiddleware.authenticate], cancelController.statusMessageCancel);

// ========================================
// Eliminar tipo de cancelación de mensaje
// ========================================
api.delete('/:id', [authMiddleware.authenticate], cancelController.deleteMessageCancel);

// ===========================================
//Mensajes canceladas con id tipo cancelación
// ===========================================
api.get('/:id/messages', [authMiddleware.authenticate], cancelController.getMessagesByCancel);

module.exports = api;