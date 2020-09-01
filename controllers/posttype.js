// ====================================================
//      Controller PostType
//      By ARYA Team ©
// ====================================================

const PostType = require('../models').PostType;
const Post = require('../models').Post;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de post
//======================================
async function getPostTypes(req, res) {
    await PostType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de post registrado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    types
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

//=================================
//Mostrar tipo de post por id
//=================================
async function getPostTypeById(req, res) {
    let id = req.params.id;
    await PostType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de post con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    type
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

//==============================================
//Mostrar todas los tipos de post por estatus
//==============================================
async function getPostTypesByStatus(req, res) {
    let status = req.params.status;
    await PostType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de post registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    types
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

//==============================
//Crear tipo de post
//==============================
async function savePostType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await PostType.create(type)
        .then(async type => {
            saveBitacora('PostType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de post creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de post no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de post
//==============================
async function updatePostType(req, res) {
    let id = req.params.id;

    await PostType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PostType', id, 'update tyoe', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de post actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de post con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de post con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de post por id
//==================================
async function deletePostType(req, res) {
    let id = req.params.id;

    await PostType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PostType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de post eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de post con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de post con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de post
//=====================================
async function statusPostType(req, res) {
    let id = req.params.id;

    let typePost;
    await PostType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de post con el id requerido',
                });
            } else {
                typePost = type;
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });

    let change = true;

    if (typePost.status === true)
        change = false;

    await PostType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('PostType', typePost.id, typePost.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de post actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de post con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getPostTypes,
    getPostTypeById,
    getPostTypesByStatus,
    savePostType,
    updatePostType,
    deletePostType,
    statusPostType
}