// ====================================================
//      Routes API: ResultParameter
//      By ARYA Team ©
// ====================================================

const express = require('express');
const resultController = require('../controllers/resultparameter');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los parametros
// =================================
api.get('/all', resultController.getResultParameters);

// =================================
// Todos los parametros por status
// =================================
api.get('/all/:status', resultController.getResultParametersByStatus);

// ==============================
// Un parametro por id
// ==============================
api.get('/:id', resultController.getResultParameterById);

// ===============================
// Crear nuevo parametro
// ===============================
api.post('/save', [authMiddleware.authenticate], resultController.saveResultParameter);

// =============================
// Editar parametro
// =============================
api.put('/:id', [authMiddleware.authenticate], resultController.updateResultParameter);

// ====================================
// Cambiar estatus de parametro
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], resultController.statusResultParameter);

// ================================
// Eliminar parametro
// ================================
api.delete('/:id', [authMiddleware.authenticate], resultController.deleteResultParameter);


module.exports = api;