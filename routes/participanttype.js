// ====================================================
//      Routes API: Participant Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const participantTypeController = require('../controllers/participanttype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de participante
// =================================
api.get('/all', participantTypeController.getParticipantTypes);

// ==============================
// Un tipo de participante por id
// ==============================
api.get('/:id', participantTypeController.getParticipantTypeById);

// ============================================
// Todos los tipos de participante por estatus
// ============================================
api.get('/all/:status', participantTypeController.getParticipantTypesByStatus);

// =================================
// Crear nuevo tipo de participante
// =================================
api.post('/save', [authMiddleware.authenticate], participantTypeController.saveParticipantType);

// =============================
// Editar tipo de participante
// =============================
api.put('/:id', [authMiddleware.authenticate], participantTypeController.updateParticipantType);

// ===========================================
// Cambiar estatus de tipo de participante
// ===========================================
api.put('/status/:id', [authMiddleware.authenticate], participantTypeController.statusParticipantType);

// ================================
// Eliminar tipo de participante
// ================================
api.delete('/:id', [authMiddleware.authenticate], participantTypeController.deleteParticipantType);

// =========================================
// Citas de un tipo de participante
// =========================================
api.get('/:typeId/participants', participantTypeController.getParticipantsByType);

module.exports = api;