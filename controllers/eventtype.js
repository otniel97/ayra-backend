// ====================================================
//      Controller EventType
//      By ARYA Team ©
// ====================================================

const EventType = require('../models').EventType;
const Event = require('../models').Event;
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de evento
//======================================
async function getEventTypes(req, res) {
    await EventType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de evento registrado',
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
//Mostrar tipo de evento por id
//=================================
async function getEventTypeById(req, res) {
    let id = req.params.id;
    await EventType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de evento con el id requerido',
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
//Mostrar todas los tipos de evento por estatus
//==============================================
async function getEventTypesByStatus(req, res) {
    let status = req.params.status;
    await EventType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de evento registrados con el estatus ${status}`,
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
//Crear tipo de evento
//==============================
async function saveEventType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await EventType.create(type)
        .then(async type => {
            saveBitacora('EventType', type.id, type.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de evento creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de evento no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de evento
//==============================
async function updateEventType(req, res) {
    let id = req.params.id;

    await EventType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('EventType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de evento actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de evento con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de evento con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de evento por id
//==================================
async function deleteEventType(req, res) {
    let id = req.params.id;

    await EventType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('EventType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de evento eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de evento con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de evento con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de evento
//=====================================
async function statusEventType(req, res) {
    let id = req.params.id;

    let typeEvent;
    await EventType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de evento con el id requerido',
                });
            } else {
                typeEvent = type;
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

    if (typeEvent.status === true)
        change = false;

    await EventType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('EventType', typeEvent.id, typeEvent.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de evento actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de evento con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar eventos de un tipo de evento
//==========================================
async function getEventsByType(req, res) {
    const eventTypeId = req.params.typeId;
    try {
        const events = await Event.findAll({
            where: { eventTypeId },
            include: [{
                model: EventType,
                required: true
            }]
        })
        events.length ?
            successMsg(res, 200, 'correcto', events) :
            successMsg(res, 200, `No existen eventos registrados`)

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}


module.exports = {
    getEventTypes,
    getEventTypeById,
    getEventTypesByStatus,
    saveEventType,
    updateEventType,
    deleteEventType,
    statusEventType,
    getEventsByType,
}