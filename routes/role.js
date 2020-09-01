// ====================================================
//      Routes API: Role
//      By ARYA Team ©
// ====================================================

const express = require('express');
const auth = require('../middlewares/auth.js');
const roleController = require('../controllers/role');
const api = express.Router();

// =================================
// Todos los roles
// =================================
api.get('/all', [auth.authenticate], roleController.getRoles);

// =================================
// Todos los roles por status
// =================================
api.get('/all/:status', roleController.getRolesByStatus);

// ==============================
// Un rol por id
// ==============================
api.get('/:id', [auth.authenticate], roleController.getRoleById);

// ===============================
// Crear nuevo rol
// ===============================
api.post('/save', [auth.authenticate], roleController.saveRole);

// =============================
// Editar rol
// =============================
api.put('/:id', [auth.authenticate], roleController.updateRole);

// ====================================
// Cambiar estatus de rol
// ====================================
api.put('/status/:id', [auth.authenticate], roleController.statusRole);

// ================================
// Eliminar rol
// ================================
api.delete('/:id', [auth.authenticate], roleController.deleteRole);


module.exports = api;