// ====================================================
//      Controller Resource
//      By ARYA Team ©
// ====================================================

const Resource = require('../models').Resource;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los recursos
//======================================
async function getResources(req, res) {
    await Resource.findAll()
        .then(resources => {
            if (resources.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay recursos registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    resources
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
//Mostrar todos los recursos
//==============================================
async function getResourcesByStatus(req, res) {
    let status = req.params.status;
    await Resource.findAll({ where: { status } })
        .then(resources => {
            if (resources.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay recursos registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    resources
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
//Mostrar recurso por id
//=================================
async function getResourceById(req, res) {
    let id = req.params.id;
    await Resource.findOne({ where: { id } })
        .then(resource => {
            if (resource === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un recurso con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    resource
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
//Crear recurso
//==============================
async function saveResource(req, res) {
    let body = req.body;

    let resource = {
        name: body.name,
        description: body.description,
        status: body.status || true,
    }

    await Resource.create(resource)
        .then(async result => {
            saveBitacora('Resource', result.id, result.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Recurso creado con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Recurso no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar recurso
//==============================
async function updateResource(req, res) {
    let id = req.params.id;

    await Resource.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('Resource', id, 'update resource', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Recurso actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la recurso con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el recurso con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar recurso por id
//==================================
async function deleteResource(req, res) {
    let id = req.params.id;

    await Resource.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Resource', id, 'delete resource', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Recurso eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un recurso con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el recurso con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar recurso
//=====================================
async function statusResource(req, res) {
    let id = req.params.id;

    let resource;
    await Resource.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay recurso con el id requerido',
                });
            } else {
                resource = result;
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

    if (resource.status === true)
        change = false;

    await Resource.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Resource', resource.id, resource.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Recurso actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el recurso con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getResources,
    getResourcesByStatus,
    getResourceById,
    saveResource,
    updateResource,
    deleteResource,
    statusResource
}