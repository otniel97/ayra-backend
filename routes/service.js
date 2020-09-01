// ====================================================
//      Routes API: Service
//      By ARYA Team ©
// ====================================================

const express = require('express');
const serviceController = require('../controllers/service');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los servicios
// =================================
api.get('/all', serviceController.getServices);

// =================================
// Todas los servicios por estatus
// =================================
api.get('/all/:status', serviceController.getServicesByStatus);

// ==============================
// Un servicio por id
// ==============================
api.get('/:id', serviceController.getServiceById);

// ===============================
// Crear nuevo servicio
// ===============================
api.post('/save', [authMiddleware.authenticate], serviceController.saveService);

// =============================
// Editar servicio
// =============================
api.put('/:id', [authMiddleware.authenticate], serviceController.updateService);

// ====================================
// Cambiar estatus de servicio
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], serviceController.statusService);

// ================================
// Eliminar servicio
// ================================
api.delete('/:id', [authMiddleware.authenticate], serviceController.deleteService);

// ================================
// Visibilidad de servicio en web
// ================================
api.put('/:id/visibility', [authMiddleware.authenticate], serviceController.updateVisibility);

// =================================
// Personas que atienden un servicio
// =================================
api.get('/:serviceId/people', [authMiddleware.authenticate], serviceController.getPeopleByServiceId);

// =================================
// Servicios de una especialidad id
// Servicios que puede atender un doctor
// =================================
api.get('/:specialityId/services', [authMiddleware.authenticate], serviceController.getServicesBySpecialtyId);

// =================================
// Servicios con visibility en true
// =================================
api.get('/visibility/all/true', serviceController.getServicesVisibility);

module.exports = api;