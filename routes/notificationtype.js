// ====================================================
//      Routes API: NotificationType
//      By ARYA Team ©
// ====================================================

const express = require('express');
const notificationTypeController = require('../controllers/notificationtype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de notificación
// =================================
api.get('/all', notificationTypeController.getNotificationTypes);

// ============================================
// Todos los tipos de notificación por status
// ============================================
api.get('/all/:status', notificationTypeController.getNotificationTypesByStatus);

// ==============================
// Un tipo de notificación por id
// ==============================
api.get('/:id', notificationTypeController.getNotificationTypeById);

// =================================
// Crear nuevo tipo de notificación
// =================================
api.post('/save', [authMiddleware.authenticate], notificationTypeController.saveNotificationType);

// =============================
// Editar tipo de notificación
// =============================
api.put('/:id', [authMiddleware.authenticate], notificationTypeController.updateNotificationType);

// ====================================
// Cambiar estatus de tipo notificación
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], notificationTypeController.statusNotificationType);

// ================================
// Eliminar tipo de notificación
// ================================
api.delete('/:id', [authMiddleware.authenticate], notificationTypeController.deleteNotificationType);

module.exports = api;