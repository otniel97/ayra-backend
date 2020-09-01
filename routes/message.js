// ====================================================
//      Routes API: Message
//      By ARYA Team ©
// ====================================================

const express = require('express');
const messageController = require('../controllers/message');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los mensajes
// =================================
api.get('/all', messageController.getMessages);

// =================================
// Todas los mensajes por estatus
// =================================
api.get('/all/:status', messageController.getMessagesByStatus);

// =================================
// Todas los mensajes cancelados
// =================================
api.get('/allCanceled', messageController.getMessagesCancel);

// ==============================
// Un mensaje por id
// ==============================
api.get('/:id', messageController.getMessageById);

// ===============================
// Crear nuevo mensaje desde web
// ===============================
api.post('/save', messageController.saveMessage);

// ===============================
// Crear nuevo mensaje de usuario
// ===============================
api.post('/save/user', [authMiddleware.authenticate], messageController.saveMessageUser);

// ===============================
// Mostrar mensajes de un usuario
// ===============================
api.get('/user/all', [authMiddleware.authenticate], messageController.getMessagesByUser);

// =============================
// Editar mensaje
// =============================
api.put('/:id', [authMiddleware.authenticate], messageController.updateMessage);

// ====================================
// Cambiar estatus de mensaje
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], messageController.statusMessage);

// ================================
// Eliminar mensaje
// ================================
api.delete('/:id', [authMiddleware.authenticate], messageController.deleteMessage);

// =====================================
// Cancelar mensaje
// =====================================
api.put('/:messageId/cancel', [authMiddleware.authenticate], messageController.cancelMessage);

// ==========================================
// Aceptar mensaje y enviar fecha de atención
// ==========================================
api.put('/:messageId/accept', [authMiddleware.authenticate], messageController.acceptMessage);

module.exports = api;