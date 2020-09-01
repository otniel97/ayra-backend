// ====================================================
//      Routes API: Donation Type
//      By ARYA Team ©
// ====================================================

const express = require('express');
const postTypeController = require('../controllers/posttype');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los tipos de post
// =================================
api.get('/all', postTypeController.getPostTypes);

// ==============================
// Un tipo de post por id
// ==============================
api.get('/:id', postTypeController.getPostTypeById);

// ======================================
// Todos los tipos de post por estatus
// ======================================
api.get('/all/:status', postTypeController.getPostTypesByStatus);

// ===============================
// Crear nuevo tipo de post
// ===============================
api.post('/save', [authMiddleware.authenticate], postTypeController.savePostType);

// =============================
// Editar tipo de post
// =============================
api.put('/:id', [authMiddleware.authenticate], postTypeController.updatePostType);

// ====================================
// Cambiar estatus de tipo de post
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], postTypeController.statusPostType);

// ================================
// Eliminar tipo de post
// ================================
api.delete('/:id', [authMiddleware.authenticate], postTypeController.deletePostType);

module.exports = api;