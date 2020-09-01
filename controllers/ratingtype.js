// ====================================================
//      Controller RatingType
//      By ARYA Team ©
// ====================================================

const RatingType = require('../models').RatingType;
const models = require('../models');
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

//========================================
//Mostrar todos los tipos de calificación
//========================================
async function getRatingTypes(req, res) {
    await RatingType.findAll()
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipos de calificación registrados',
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

//====================================
//Mostrar tipo de calificación por id
//====================================
async function getRatingTypeById(req, res) {
    let id = req.params.id;
    await RatingType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de calificación con el id requerido',
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

//====================================================
//Mostrar todos los tipos de calificación por estatus
//====================================================
async function getRatingTypesByStatus(req, res) {
    let status = req.params.status;
    await RatingType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de calificación registrados con el estatus ${status}`,
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
//Crear tipo de calificación
//==============================
async function saveRatingType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        entity: body.entity, //debe ser solo citas o actividades
        scale: body.scale, //debe ser estrellas o respuestas
        status: body.status || true
    }

    await RatingType.create(type)
        .then(async result => {
            saveBitacora('RatingType', result.id, result.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de calificación creado con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de calificación no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//================================
//Actualizar tipo de calificación
//================================
async function updateRatingType(req, res) {
    let id = req.params.id;

    await RatingType.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('RatingType', id, 'update type', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de calificación actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de calificación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de calificación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=======================================
//Eliminar tipo de calificación por id
//=======================================
async function deleteRatingType(req, res) {
    let id = req.params.id;

    await RatingType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('RatingType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de calificación eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de calificación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de calificación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//========================================
//Activar desactivar tipo de calificación
//========================================
async function statusRatingType(req, res) {
    let id = req.params.id;

    let ratingType;
    await RatingType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay el tipo de calificación con el id requerido',
                });
            } else {
                ratingType = type;
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

    if (ratingType.status === true)
        change = false;

    await RatingType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('RatingType', ratingType.id, ratingType.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de calificación actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de calificación con id = ${id}.`,
                error: err.message
            });
        });
}

async function getRatingTypesByEntity(req, res) {
    let entity = req.params.entity;
    await RatingType.findAll({ where: { entity, status: true } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de calificación registrados para ${entity}`,
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

async function getRatingTypeByEventDetail(req, res) {
    const id = req.params.eventDetailId;
    const ratingTypes = [];
    try {
        const eventDetail = await models.EventDetail.findOne({ where: { id } })
        if (!eventDetail) successMsg(res, 200, 'No exsite el detalle evento', `Detalle evento id ${id}`)
        const event = await models.Event.findOne({ where: { id: eventDetail.eventId } })
        const types = await event.getRatingTypes();
        types.forEach((item) => {
            if (item.status)
                ratingTypes.push(item)
        });
        ratingTypes.length ?
            successMsg(res, 200, 'correcto', ratingTypes) :
            successMsg(res, 200, `No hay preguntas de calificación para el detalle evento de id ${id}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

async function getRatingTypeByService(req, res) {
    const id = req.params.serviceId;
    const ratingTypes = [];
    try {
        const service = await models.Service.findOne({ where: { id } })
        if (!service) successMsg(res, 200, 'No exsite el servicio', `Servicio id ${id}`)
        const types = await service.getRatingTypes();
        types.forEach((item) => {
            if (item.status)
                ratingTypes.push(item)
        });
        ratingTypes.length ?
            successMsg(res, 200, 'correcto', ratingTypes) :
            successMsg(res, 200, `No hay preguntas de calificación para el servicio de id ${id}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    getRatingTypes,
    getRatingTypeById,
    getRatingTypesByStatus,
    saveRatingType,
    updateRatingType,
    deleteRatingType,
    statusRatingType,
    getRatingTypesByEntity,
    getRatingTypeByEventDetail,
    getRatingTypeByService
}