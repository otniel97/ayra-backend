// ====================================================
//      Routes API: RiskFactor
//      By ARYA Team ©
// ====================================================

const express = require('express');
const riskFactorController = require('../controllers/riskfactor');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas los factores riesgo
// =================================
api.get('/all', riskFactorController.getRiskFactories);

// ==============================
// Un factor riesgo por id
// ==============================
api.get('/:id', riskFactorController.getRiskFactorById);

// ==================================
// Todas los riesgos por status
// ==================================
api.get('/all/:status', riskFactorController.getRiskFactorsByStatus);

// ===============================
// Crear nuevo factor riesgo
// ===============================
api.post('/save', [authMiddleware.authenticate], riskFactorController.saveRiskFactor);

// =============================
// Editar enfermedad
// =============================
api.put('/:id', [authMiddleware.authenticate], riskFactorController.updateRiskFactor);

// ====================================
// Cambiar estatus de factor riesgo
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], riskFactorController.statusRiskFactor);

// ================================
// Eliminar factor riesgo
// ================================
api.delete('/:id', [authMiddleware.authenticate], riskFactorController.deleteRiskFactor);


module.exports = api;