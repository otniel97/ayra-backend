// ====================================================
//      Controller Post
//      By ARYA Team ©
// ====================================================

const Post = require('../models').Post;
const models = require('../models');
const notification = require('../services/notification');
const { uploadFile } = require('./upload');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las publicaciones
//======================================
async function getPosts(req, res) {
    await Post.findAll({
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EventDetail,
                    required: false
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            if (posts.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay publicaciones registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    posts
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==================================================
//Mostrar todas las publicaciones por estatus
//==================================================
async function getPostsByStatus(req, res) {
    let status = req.params.status;
    await Post.findAll({
            where: { status },
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EventDetail,
                    required: false
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            if (posts.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay publicaciones registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    posts
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//===================================
//Mostrar publicación por id
//===================================
async function getPostById(req, res) {
    let id = req.params.id;
    await Post.findOne({
            where: { id },
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EventDetail,
                    required: false
                }
            ]
        })
        .then(post => {
            if (post === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay publicación con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    post
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==============================
//Crear publicación general
//==============================
async function savePost(req, res) {
    let body = req.body;

    let post = {
        title: body.title,
        content: body.content,
        author: body.author,
        status: body.status || true,
        organizationId: body.organizationId,
        categoryId: body.categoryId,
        postTypeId: body.postTypeId
    }

    await Post.create(post)
        .then(async post => {
            await notification.newPublication(post.id);
            saveBitacora('Post', post.id, post.title, 'create', req.user.id);
            saveImage(req, res, post.id);
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Publicación no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//================================
//Actualizar publicación 
//================================
async function updatePost(req, res) {
    let id = req.params.id;

    await Post.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Post', id, 'update post', 'update', req.user.id);
                if (req.files)
                    saveImage(req, res, id);
                else
                    res.status(200).json({
                        ok: true,
                        message: `Post con id = ${id} actualizado con éxito.`
                    });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la publicación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la publicación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Eliminar publicación por id
//=====================================
async function deletePost(req, res) {
    let id = req.params.id;

    await Post.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Post', id, 'delete post', 'post', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Publicación general eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la publicación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la publicación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=========================================
//Activar desactivar publicación
//=========================================
async function statusPost(req, res) {
    let id = req.params.id;

    await Post.findOne({
            where: { id },
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    required: false,
                    include: [models.User],
                    as: 'comments'
                },
                {
                    model: models.EventDetail,
                    required: false
                }
            ]
        })
        .then(async post => {
            if (post === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay publicación con el id requerido',
                });
            } else {
                const check = post.status;
                if (check === false)
                    post.status = true;
                else
                    post.status = false;

                await post.save();

                saveBitacora('Post', post.id, post.title, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Publicación actualizada con éxito',
                    post
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                err: err.message
            });
        });
}

//=========================================
//Subir imagen de la publicación
//=========================================
async function saveImage(req, res, id) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'posts';
    req.params.format = 'image';
    req.params.id = id;
    uploadFile(req, res);
}

//==========================================
//Mostrar post de un tipo de post
//==========================================
async function getPostsByType(req, res) {
    let postTypeId = req.params.postTypeId;
    await Post.findAll({
            where: { postTypeId },
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EventDetail,
                    required: false
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            if (posts.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay publicaciones registradas con el tipo de post de id ${postTypeId}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    posts
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==========================================
//Mostrar post de un tipo de post eventos
//==========================================
async function getPostsByTypeByEvents(req, res) {
    let postTypeId = req.params.postTypeId;
    await Post.findAll({
            where: { postTypeId },
            include: [{
                    model: models.PostCategory,
                    required: false
                },
                {
                    model: models.PostType,
                    required: false
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EventDetail,
                    where: { statusDetail: ['scheduled', 'rescheduled'] },
                    required: true
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(posts => {
            if (posts.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay publicaciones registradas con el tipo de post de id ${postTypeId}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    posts
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

module.exports = {
    getPosts,
    getPostsByStatus,
    getPostById,
    savePost,
    updatePost,
    deletePost,
    statusPost,
    getPostsByType,
    getPostsByTypeByEvents
}