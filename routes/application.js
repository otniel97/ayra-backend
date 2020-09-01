// ====================================================
//      Routes API: Donation
//      By ARYA Team ©
// ====================================================

const express = require('express');
const applicationController = require('../controllers/application');
const serviceBackup = require('../services/backup');
const serviceRestore = require('../services/restore');
const serviceClean = require('../services/clean');
const authMiddleware = require('../middlewares/auth');
const api = express.Router();

// =================================
// Login de usuarios
// =================================
api.post('/login', applicationController.login);

// =================================
// Verificar correo
// =================================
api.put('/changePassword', authMiddleware.authenticate, applicationController.changePassword);

// =================================
// Recuperar contraseña
// =================================
api.put('/recoverPassword', applicationController.recoverPassword);

// =================================
// Registrar usuario (temporal)
// =================================
api.post('/register', applicationController.registerUser);

// ===============================================
// Realizar backup o export devuelve archivo .tar
// ===============================================
api.get('/backup', authMiddleware.authenticate, serviceBackup.backup);

// ===============================================
// Obtener backups
// ===============================================
api.get('/backups/all', authMiddleware.authenticate, serviceBackup.getBackups);

// ======================================
// Realizar import mandar archivo .tar
// ======================================
api.post('/restore', authMiddleware.authenticate, serviceRestore.restore);

// ======================================
// Realizar clean vaciar base de datos
// ======================================
api.put('/clean', authMiddleware.authenticate, serviceClean.clean);

module.exports = api;