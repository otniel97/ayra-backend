// ====================================================
//      Controller Donation
//      By ARYA Team ©
// ====================================================

const models = require('../models');
const Request = require('../models').Request;
const notification = require('../services/notification');
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las solicitudes
//======================================
async function getRequests(req, res) {
    try {
        const data = await Request.findAll({
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen solicitudes registradas')
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==========================================
//Mostrar todas las solicitudes por estatus
//==========================================
async function getRequestsByStatus(req, res) {
    let status = req.params.status;
    try {
        const data = await Request.findAll({
            where: { status },
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen solicitudes registradas con el status ${status}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar solicitud por id
//=================================
async function getRequestById(req, res) {
    let id = req.params.id;
    try {
        const data = await Request.findOne({
            where: { id },
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data
            ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No hay solicitudes registradas con el id: ${id}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear solicitud
//==============================
async function saveRequest(req, res) {
    let userId = req.user.id;
    let body = req.body;

    let request = {
        userId,
        activityTypeId: body.activityTypeId,
        requestTypeId: body.requestTypeId,
        description: body.description,
        status: null
    }

    await Request.create(request)
        .then(async request => {
            await notification.newRequest();
            saveBitacora('Request', request.id, request.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Solicitud creada exitosamente',
                request
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Solicitud no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Aceptar solicitud
//==============================
async function acceptRequest(req, res) {
    let id = req.params.id;
    try {
        const data = await Request.findOne({ where: { id } })

        if (!data)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            if (!req.body.response)
                successMsg(res, 400, `Debe enviar el campo respuesta`)
            else {
                data.set({ status: true })
                data.set({ response: req.body.response })
                await data.save()
                await notification.requestResponse(data.userId);
                saveBitacora('Request', data.id, data.description, 'accepted', req.user.id);
                successMsg(res, 200, "Solicitud aceptada correctamente", data)
            }
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==============================
//Cancelar solicitud
//==============================
async function cancelRequest(req, res) {
    let id = req.params.id;
    try {
        const data = await Request.findOne({ where: { id } })

        if (!data)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            if (!req.body.response)
                successMsg(res, 400, `Debe enviar el campo respuesta`)
            else {
                data.set({ status: false })
                data.set({ response: req.body.response })
                await data.save()
                await notification.requestResponse(data.userId);
                saveBitacora('Request', data.id, data.description, 'canceled', req.user.id);
                successMsg(res, 200, "Solicitud cancelada correctamente", data)
            }
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=================================================
//Mostrar todas las solicitudes por tipo de evento
//=================================================
async function getRequestsByEventType(req, res) {
    let activityTypeId = req.params.activityTypeId;
    try {
        const data = await Request.findAll({
            where: { activityTypeId },
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen solicitudes registradas con el tipo de evento ${activityTypeId}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=====================================================
//Mostrar todas las solicitudes por tipo de solicitud
//=====================================================
async function getRequestsByRequestType(req, res) {
    let requestTypeId = req.params.requestTypeId;
    try {
        const data = await Request.findAll({
            where: { requestTypeId },
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen solicitudes registradas con el tipo de solicitud ${requestTypeId}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================================
//Mostrar todas las solicitudes por usuario
//=================================================
async function getRequestsByUser(req, res) {
    let userId = req.user.id;
    try {
        const data = await Request.findAll({
            where: { userId },
            include: [{
                    model: models.User,
                    required: false,
                }, {
                    model: models.EventType,
                    required: false,
                },
                {
                    model: models.RequestType,
                    required: false,
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen solicitudes registradas con el usuario ${userId}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    getRequests,
    getRequestsByStatus,
    getRequestById,
    saveRequest,
    acceptRequest,
    cancelRequest,
    getRequestsByEventType,
    getRequestsByRequestType,
    getRequestsByUser
}