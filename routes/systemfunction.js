// ====================================================
//      Routes API: SystemFunction
//      By ARYA Team ©
// ====================================================

const express = require('express');
const systemFunctionController = require('../controllers/systemfunction');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las funciones
// =================================
api.get('/all', systemFunctionController.getSystemFunctions);

// =================================
// Todas las funciones por status
// =================================
api.get('/all/:status', systemFunctionController.getSystemFunctionsByStatus);

// ==============================
// Una funcion por id
// ==============================
api.get('/:id', systemFunctionController.getSystemFunctionById);

// ===============================
// Crear nueva funcion
// ===============================
api.post('/save', [authMiddleware.authenticate], systemFunctionController.saveSystemFunction);

// =============================
// Editar funcion
// =============================
api.put('/:id', [authMiddleware.authenticate], systemFunctionController.updateSystemFunction);

// ====================================
// Cambiar estatus de funcion
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], systemFunctionController.statusSystemFunction);

// ================================
// Eliminar funcion
// ================================
api.delete('/:id', [authMiddleware.authenticate], systemFunctionController.deleteSystemFunction);


module.exports = api;