// ====================================================
//      Routes API: MessageType
//      By ARYA Team ©
// ====================================================

const express = require('express');
const notificationController = require('../controllers/notification');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// ===============================================
// Mostrar notificaciones de usuario no leídas
// ===============================================
api.get('/all', [authMiddleware.authenticate], notificationController.getAllByUser);

// ===============================================
// Marcar leída notificación id 
// ===============================================
api.put('/:id', [authMiddleware.authenticate], notificationController.statusNotification);

// ==========================================================
// Marcar leídas todas las notificaciones de usuario logeado
// ==========================================================
api.put('/all/read', [authMiddleware.authenticate], notificationController.statusAllNotification);

module.exports = api;