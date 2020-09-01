// ====================================================
//      Routes API: Resource
//      By ARYA Team ©
// ====================================================

const express = require('express');
const resourceController = require('../controllers/resource');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los recursos
// =================================
api.get('/all', resourceController.getResources);

// =================================
// Todos los recursos por status
// =================================
api.get('/all/:status', resourceController.getResourcesByStatus);

// ==============================
// Un recurso por id
// ==============================
api.get('/:id', resourceController.getResourceById);

// ===============================
// Crear nuevo recurso
// ===============================
api.post('/save', [authMiddleware.authenticate], resourceController.saveResource);

// =============================
// Editar recurso
// =============================
api.put('/:id', [authMiddleware.authenticate], resourceController.updateResource);

// ====================================
// Cambiar estatus de recurso
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], resourceController.statusResource);

// ================================
// Eliminar recurso
// ================================
api.delete('/:id', [authMiddleware.authenticate], resourceController.deleteResource);


module.exports = api;