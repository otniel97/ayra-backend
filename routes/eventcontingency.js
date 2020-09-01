// ====================================================
//      Routes API: Event Contingency
//      By ARYA Team ©
// ====================================================

const express = require('express');
const eventContingencyController = require('../controllers/eventcontingency');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las contingencias
// =================================
api.get('/all', [authMiddleware.authenticate], eventContingencyController.getEventContingencies);

// ==============================
// Contingencias de un detalle Id
// ==============================
api.get('/:eventDetailId', [authMiddleware.authenticate], eventContingencyController.getEventContingenciesByEventDetail);

module.exports = api;