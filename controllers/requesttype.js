// ====================================================
//      Controller RequestType
//      By ARYA Team ©
// ====================================================

const RequestType = require('../models').RequestType;
const Request = require('../models').Request;
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de solicitud
//======================================
async function getRequestTypes(req, res) {
    await RequestType.findAll({
            include: [{
                model: Request,
                required: false
            }]
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de solicitud registrado',
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
//Mostrar tipo de solicitud por id
//=================================
async function getRequestTypeById(req, res) {
    let id = req.params.id;
    await RequestType.findOne({
            where: { id },
            include: [{
                model: Request,
                required: false
            }]
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de solicitud con el id requerido',
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

//=================================================
//Mostrar todas los tipos de solicitud por estatus
//=================================================
async function getRequestTypesByStatus(req, res) {
    let status = req.params.status;
    await RequestType.findAll({
            where: { status },
            include: [{
                model: Request,
                required: false
            }]
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de solicitud registrados con el estatus ${status}`,
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
//Crear tipo de solicitud
//==============================
async function saveRequestType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await RequestType.create(type)
        .then(type => {
            saveBitacora('RequestType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de solicitud creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de solicitud no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de solicitud
//==============================
async function updateRequestType(req, res) {
    let id = req.params.id;

    await RequestType.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('RequestType', id, 'update resource', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de solicitud actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de solicitud con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de solicitud con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de solicitud por id
//==================================
async function deleteRequestType(req, res) {
    let id = req.params.id;

    await RequestType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('RequestType', id, 'delete resource', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de solicitud eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de solicitud con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de solicitud con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de solicitud
//=====================================
async function statusRequestType(req, res) {
    let id = req.params.id;

    let typeRequest;
    await RequestType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de solicitud con el id requerido',
                });
            } else {
                typeRequest = type;
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

    if (typeRequest.status === true)
        change = false;

    await RequestType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('RequestType', typeRequest.id, typeRequest.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de solicitud actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de solicitud con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar solicitud de un tipo de solicitud
//==========================================
async function getRequestsByType(req, res) {
    const requestTypeId = req.params.typeId;
    try {
        const requests = await Request.findAll({
            where: { requestTypeId },
            include: [{
                model: RequestType,
                required: false
            }]
        })
        requests.length ?
            successMsg(res, 200, 'correcto', requests) :
            successMsg(res, 200, `No existen solicitudes registradas`)

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    getRequestTypes,
    getRequestTypeById,
    getRequestTypesByStatus,
    saveRequestType,
    updateRequestType,
    deleteRequestType,
    statusRequestType,
    getRequestsByType
}