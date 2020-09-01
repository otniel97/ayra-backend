// ====================================================
//      Routes API: Comment
//      By ARYA Team ©
// ====================================================

const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const commentController = require('../controllers/comment');
const api = express.Router();

// ===============================
// Crear nuevo comentario
// ===============================
api.post('/save', [authMiddleware.authenticate], commentController.saveComment);

// =============================
// Editar comentario
// =============================
api.put('/:id', [authMiddleware.authenticate], commentController.updateComment);

// ================================
// Eliminar comentario
// ================================
api.delete('/:id', [authMiddleware.authenticate], commentController.deleteComment);


module.exports = api;