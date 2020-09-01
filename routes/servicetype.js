// ====================================================
//      Routes API: Service Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const serviceTypeController = require('../controllers/servicetype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los tipos de servicios
// =================================
api.get('/all', serviceTypeController.getServiceTypes);

// =================================
// Todas los tipos de servicios
// =================================
api.get('/all/:status', serviceTypeController.getServiceTypesByStatus);

// ==============================
// Un tipo de servicio por id
// ==============================
api.get('/:id', serviceTypeController.getServiceTypeById);

// ===============================
// Crear nuevo tipo de servicio
// ===============================
api.post('/save', [authMiddleware.authenticate], serviceTypeController.saveServiceType);

// =============================
// Editar tipo de servicio
// =============================
api.put('/:id', [authMiddleware.authenticate], serviceTypeController.updateServiceType);

// ====================================
// Cambiar estatus de tipo de servicio
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], serviceTypeController.statusServiceType);

// ================================
// Eliminar tipo de servicio
// ================================
api.delete('/:id', [authMiddleware.authenticate], serviceTypeController.deleteServiceType);

// =========================================
// Servicios de un tipo de servicio
// =========================================
api.get('/:typeId/services', serviceTypeController.getServicesByType);

module.exports = api;