// ====================================================
//      Routes API: Person Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const personTypeController = require('../controllers/persontype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los tipos de persona
// =================================
api.get('/all', personTypeController.getPersonTypes);

// ==============================
// Un tipo de persona por id
// ==============================
api.get('/:id', personTypeController.getPersonTypeById);

// ============================================
// Todos los tipos de participante por estatus
// ============================================
api.get('/all/:status', personTypeController.getPersonTypesByStatus);

// ===============================
// Crear nuevo tipo de persona
// ===============================
api.post('/save', [authMiddleware.authenticate], personTypeController.savePersonType);

// =============================
// Editar tipo de persona
// =============================
api.put('/:id', [authMiddleware.authenticate], personTypeController.updatePersonType);

// ====================================
// Cambiar estatus de tipo de persona
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], personTypeController.statusPersonType);

// ================================
// Eliminar tipo de persona
// ================================
api.delete('/:id', [authMiddleware.authenticate], personTypeController.deletePersonType);

module.exports = api;