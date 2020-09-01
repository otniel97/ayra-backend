// ====================================================
//      Routes API: Post Category
//      By ARYA Team ©
// ====================================================

const express = require('express');
const postCategoryController = require('../controllers/postcategory');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todas las categorías de post
// =================================
api.get('/all', postCategoryController.getPostCategories);

// ==============================
// Una categoría de post por id
// ==============================
api.get('/:id', postCategoryController.getPostCategoryById);

// ========================================
// Todas las categoría de post por estatus
// ========================================
api.get('/all/:status', postCategoryController.getPostCategoriesByStatus);

// ===============================
// Crear nueva categoría de post
// ===============================
api.post('/save', [authMiddleware.authenticate], postCategoryController.savePostCategory);

// =============================
// Editar categoría de post
// =============================
api.put('/:id', [authMiddleware.authenticate], postCategoryController.updatePostCategory);

// ====================================
// Cambiar estatus de categoría de post
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], postCategoryController.statusPostCategory);

// ================================
// Eliminar categoría de post
// ================================
api.delete('/:id', [authMiddleware.authenticate], postCategoryController.deletePostCategory);

// =========================================
// Post de una categoría de post
// =========================================
api.get('/:categoryId/posts', postCategoryController.getPostsByCategory);

module.exports = api;