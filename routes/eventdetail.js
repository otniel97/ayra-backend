// ====================================================
//      Routes API: Event Detail
//      By ARYA Team ©
// ====================================================

const express = require('express');
const eventDetailController = require('../controllers/eventdetail');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los detalles de evento
// =================================
api.get('/all', eventDetailController.getEventDetails);

// ==============================
// Un detalle de evento por id
// ==============================
api.get('/:id', eventDetailController.getEventDetailById);

// ====================================================
// Todos los detalles de evento por estatus true o false
// ====================================================
api.get('/all/:status', [authMiddleware.authenticate], eventDetailController.getEventDetailsByStatus);

// ====================================================
// Todos los detalles de evento por estatusDetail
// ====================================================
api.get('/all/:statusDetail/statusDetail', [authMiddleware.authenticate], eventDetailController.getEventDetailsByStatusDetail);

// ===============================
// Crear nuevo tipo de evento
// ===============================
api.post('/save', [authMiddleware.authenticate], eventDetailController.saveEventDetail);

// =============================
// Editar detalle del evento
// =============================
api.put('/:id', [authMiddleware.authenticate], eventDetailController.updateEventDetail);

// ====================================
// Cambiar estatus de detalle evento
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], eventDetailController.statusEventDetail);

// ================================
// Eliminar tipo de evento
// ================================
api.delete('/:id', [authMiddleware.authenticate], eventDetailController.deleteEventDetail);

// ================================
// Agendar evento
// ================================
api.put('/schedule/:id', [authMiddleware.authenticate], eventDetailController.scheduleEventDetail);

// ================================
// Cancelar evento
// ================================
api.put('/cancel/:id', [authMiddleware.authenticate], eventDetailController.cancelEventDetail);

// ================================
// Replanificar evento
// ================================
api.put('/reschedule/:id', [authMiddleware.authenticate], eventDetailController.resheduleEventDetail);

// ================================
// Finalizar evento
// ================================
api.put('/finish/:id', [authMiddleware.authenticate], eventDetailController.finishEventDetail);

// ================================
// Pacientes de un detalle evento
// ================================
api.get('/eventPatients/:id', [authMiddleware.authenticate], eventDetailController.getEventDetailPatientsById);

// ===================================
// Eventos de un usuario id
// ===================================
api.get('/user/invitations/events', [authMiddleware.authenticate], eventDetailController.getEventDetailsByUser);

// ================================
// Párametros de un detalle evento
// ================================
api.get('/eventParameters/:id', [authMiddleware.authenticate], eventDetailController.getEventDetailParametersById);

// ==============================================
// Actualizar Párametros de un detalle evento
// ==============================================
api.put('/eventParameters/results/:id', [authMiddleware.authenticate], eventDetailController.parametersEventDetailResults);


module.exports = api;