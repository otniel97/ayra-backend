// ====================================================
//      Routes API: SystemFunction
//      By ARYA Team ©
// ====================================================

const express = require('express');
const systemFunctionRole = require('../controllers/systemfunctionrole');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Obtener roles con sus funciones
// =================================
api.get('/all', [authMiddleware.authenticate], systemFunctionRole.getSystemFunctionsRoles);

// =================================
// Agregar funciones a un rol
// =================================
api.post('/add', [authMiddleware.authenticate], systemFunctionRole.addSystemFunctionToRole);

// =================================
// Obtener funciones de un rol
// =================================
api.get('/:id', [authMiddleware.authenticate], systemFunctionRole.getSystemFunctionRolesById);

// =================================
// Actualizar funciones de un rol
// =================================
api.put('/update/:id', [authMiddleware.authenticate], systemFunctionRole.updateSystemFunctionsRoles);

// =================================
// Elminar funciones de un rol
// =================================
api.delete('/delete/:id', [authMiddleware.authenticate], systemFunctionRole.deleteSystemFunctionRoles);


module.exports = api;