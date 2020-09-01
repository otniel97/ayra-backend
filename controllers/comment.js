// ====================================================
//      Controller Comment
//      By ARYA Team ©
// ====================================================

const Comment = require('../models').Comment;
const { saveBitacora } = require('../services/bitacora');

//==============================
//Crear comentario
//==============================
async function saveComment(req, res) {
    let body = req.body;

    let comment = {
        message: body.message,
        userId: body.userId,
        postId: body.postId,
        status: body.status || true
    }

    await Comment.create(comment)
        .then(async comment => {
            saveBitacora('Comment', comment.id, comment.message, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Comentario creado con éxito',
                comment
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Comentario no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar comentario
//==============================
async function updateComment(req, res) {
    let id = req.params.id;

    await Comment.update(req.body, { where: { id: id } })
        .then(async comment => {
            if (comment == 1) {
                saveBitacora('Comment', id, 'update comment', 'create', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Comentario actualizado con éxito',
                    comment
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el comentario con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el rol con id = ${id}.`,
                error: err.message
            });
        });
}

//==================================
//Eliminar comentario por id
//==================================
async function deleteComment(req, res) {
    let id = req.params.id;

    await Comment.destroy({ where: { id: id } })
        .then(async comment => {
            if (comment == 1) {
                saveBitacora('Comment', id, 'comment delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Comentario eliminado con éxito',
                    comment
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un comentario con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el comentario con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

module.exports = {
    saveComment,
    updateComment,
    deleteComment
}