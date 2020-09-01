// ====================================================
//      Routes API: Donation
//      By ARYA Team ©
// ====================================================

const express = require('express');
const organizationController = require('../controllers/organization');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// ==============================
// Obtener la organización
// ==============================
api.get('/:id', organizationController.getOrganization);

// ===============================
// Crear nueva organización
// ===============================
api.post('/save', [authMiddleware.authenticate], organizationController.saveOrganization);

// =============================
// Editar organización
// =============================
api.put('/:id', [authMiddleware.authenticate], organizationController.updateOrganization);

// ================================
// Editar apk de la organización
// ================================
api.put('/:id/colors', [authMiddleware.authenticate], organizationController.updateOrganizationColor);

// ==================================
// Editar imagen de la organización
// ==================================
api.put('/:id/image', [authMiddleware.authenticate], organizationController.updateImage);

// ================================
// Editar apk de la organización
// ================================
api.put('/:id/apk', [authMiddleware.authenticate], organizationController.updateApk);

// ===============================================
// Editar link de descarga apk de la organización
// ===============================================
api.put('/:id/urlApk', [authMiddleware.authenticate], organizationController.updateUrlDownloadApk);

module.exports = api;