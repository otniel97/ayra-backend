// ====================================================
//      Routes API: Faq
//      By ARYA Team ©
// ====================================================

const express = require('express');
const faqController = require('../controllers/faq');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las preguntas
// =================================
api.get('/all', faqController.getFaqs);

// =================================
// Todas las preguntas por estatus
// =================================
api.get('/all/:status', faqController.getFaqsByStatus);

// ==============================
// Una pregunta por id
// ==============================
api.get('/:id', faqController.getFaqById);

// ===============================
// Crear nueva pregunta
// ===============================
api.post('/save', [authMiddleware.authenticate], faqController.saveFaq);

// =============================
// Editar pregunta
// =============================
api.put('/:id', [authMiddleware.authenticate], faqController.updateFaq);

// ====================================
// Cambiar estatus de pregunta
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], faqController.statusFaq);

// ================================
// Eliminar pregunta
// ================================
api.delete('/:id', [authMiddleware.authenticate], faqController.deleteFaq);


module.exports = api;