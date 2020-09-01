// ====================================================
//      Routes API: Post
//      By ARYA Team ©
// ====================================================

const express = require('express');
const postController = require('../controllers/post');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las publicaciones
// =================================
api.get('/all', postController.getPosts);

// ===========================================
// Todas las publicaciones por estatus
// ===========================================
api.get('/all/:status', postController.getPostsByStatus);

// ==============================
// Una publicación por id
// ==============================
api.get('/:id', postController.getPostById);

// =================================
// Crear nueva publicación
// =================================
api.post('/save', [authMiddleware.authenticate], postController.savePost);

// =============================
// Editar publicación
// =============================
api.put('/:id', [authMiddleware.authenticate], postController.updatePost);

// =======================================
// Cambiar estatus de publicación
// =======================================
api.put('/status/:id', [authMiddleware.authenticate], postController.statusPost);

// ================================
// Eliminar publicación
// ================================
api.delete('/:id', [authMiddleware.authenticate], postController.deletePost);

// =========================================
// Post de un tipo de post
// =========================================
api.get('/:postTypeId/posts', postController.getPostsByType);

// =============================================
// Post de actividades agendadas y reagendadas
// =============================================
api.get('/:postTypeId/posts/events', postController.getPostsByTypeByEvents);

module.exports = api;