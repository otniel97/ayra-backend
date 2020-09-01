// ====================================================
//      Controller PostCategory
//      By ARYA Team ©
// ====================================================

const PostCategory = require('../models').PostCategory;
const Post = require('../models').Post;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las categorías
//======================================
async function getPostCategories(req, res) {
    await PostCategory.findAll()
        .then(categories => {
            if (categories.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay categorías registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    categories
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

//==============================================
//Mostrar todas las categorías por estatus
//==============================================
async function getPostCategoriesByStatus(req, res) {
    let status = req.params.status;
    await PostCategory.findAll({ where: { status } })
        .then(categories => {
            if (categories.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay categorías registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    categories
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
//Mostrar categoría por id
//=================================
async function getPostCategoryById(req, res) {
    let id = req.params.id;
    await PostCategory.findOne({ where: { id } })
        .then(category => {
            if (category === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay categorías con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    category
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
//Crear categoría
//==============================
async function savePostCategory(req, res) {
    let body = req.body;

    let category = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await PostCategory.create(category)
        .then(async cat => {
            saveBitacora('PostCategory', cat.id, cat.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Categoría creada con éxito',
                cat
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Categoría no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar categoría
//==============================
async function updatePostCategory(req, res) {
    let id = req.params.id;

    await PostCategory.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PostCategory', id, 'update category', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Categoría actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la categoría con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la categoría con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar categoría por id
//==================================
async function deletePostCategory(req, res) {
    let id = req.params.id;

    await PostCategory.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PostCategory', id, 'delete category', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Categoría eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la categoría con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la categoría con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar categoría
//=====================================
async function statusPostCategory(req, res) {
    let id = req.params.id;

    let category;
    await PostCategory.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay categoría con el id requerido',
                });
            } else {
                category = result;
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

    if (category.status === true)
        change = false;

    await PostCategory.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('PostCategory', category.id, category.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Categoría actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la categoría con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar post de una categoría
//==========================================
async function getPostsByCategory(req, res) {
    let categoryId = req.params.categoryId;
    await Post.findOne({
            where: { categoryId }
        })
        .then(post => {
            if (post === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay publicación con la categoría requerida',
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

module.exports = {
    getPostCategories,
    getPostCategoriesByStatus,
    getPostCategoryById,
    savePostCategory,
    updatePostCategory,
    deletePostCategory,
    statusPostCategory,
    getPostsByCategory
}