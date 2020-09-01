// ====================================================
//      Controller Rating
//      By ARYA Team ©
// ====================================================

const Rating = require('../models').Rating;
const models = require('../models');
const { successMsg, errorMsg } = require('../utils/responses');

//========================================
//Mostrar todas las calificaciones
//========================================
async function getRatings(req, res) {
    try {
        const data = await Rating.findAll({
            include: [{
                    required: false,
                    model: models.EventDetail,
                    include: [{ model: models.Event, include: [models.EventType] }]
                }, {
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen calificaciones registradas')
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todas las calificaciones de servicios
//==============================================
async function getRatingsServices(req, res) {
    try {
        const data = await Rating.findAll({
            where: { eventDetailId: null },
            include: [{
                    required: false,
                    model: models.EventDetail
                }, {
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen calificaciones de servicios registradas')
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//===============================================
//Mostrar todas las calificaciones de servicio id
//===============================================
async function getRatingsByServiceId(req, res) {
    let serviceId = req.params.serviceId;
    try {
        const data = await Rating.findAll({
            where: { serviceId },
            include: [{
                    required: false,
                    model: models.EventDetail
                }, {
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen calificaciones para el servicio con id ${serviceId}`)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//====================================================
//Mostrar todas las calificaciones de detalle evento
//====================================================
async function getRatingsEventDetails(req, res) {
    try {
        const data = await Rating.findAll({
            where: { serviceId: null },
            include: [{
                    required: false,
                    model: models.EventDetail,
                    include: [{ model: models.Event, include: [models.EventType] }]
                }, {
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen calificaciones de detalle eventos registradas')
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================================
//Mostrar todas las calificaciones de detalle evento id
//======================================================
async function getRatingsByEventDetailId(req, res) {
    let eventDetailId = req.params.eventDetailId;
    try {
        const data = await Rating.findAll({
            where: { eventDetailId },
            include: [{
                    required: false,
                    model: models.EventDetail,
                    include: [{ model: models.Event, include: [models.EventType] }]
                }, {
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No existen calificaciones para el detalle evento con id ${eventDetailId}`)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//Crear calificación
async function saveRating(req, res) {
    try {
        let body = req.body;
        let serviceId = req.body.serviceId;
        let eventDetailId = body.eventDetailId;
        let userId = req.user.id;
        if (body.ratings) {
            body.ratings.forEach((item) => {
                var newRating = {
                    eventDetailId,
                    serviceId,
                    userId,
                    ratingTypeId: item.ratingTypeId,
                    stars: item.stars,
                    response: item.response
                }
                Rating.create(newRating)
            });
            if (req.body.appointmentId) {
                const app = await models.Appointment.findOne({ where: { id: req.body.appointmentId } })
                app.qualified = true;
                app.save();
            }
            successMsg(res, 200, 'Calificación guardada, Gracias! ');
        } else
            successMsg(res, 400, 'Arreglo de calificaciones vacío ');
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================================
//Mostrar calificaciones de servicios por usuario
//======================================================
async function getRatingsByServicesByUser(req, res) {
    const userId = req.user.id;
    console.log(userId);
    try {
        const data = await Rating.findAll({
            where: { userId, eventDetailId: null },
            include: [{
                    required: false,
                    model: models.Service
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen calificaciones registradas para servicios')
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================================
//Mostrar calificaciones de detalles evento por usuario
//======================================================
async function getRatingsByEventDetailsByUser(req, res) {
    const userId = req.user.id;
    console.log(userId);
    try {
        const data = await Rating.findAll({
            where: { userId, serviceId: null },
            include: [{
                    required: false,
                    model: models.EventDetail,
                    include: [{ model: models.Event, include: [models.EventType] }]
                },
                {
                    required: false,
                    model: models.User
                },
                {
                    required: false,
                    model: models.RatingType
                }
            ]
        })
        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen calificaciones registradas para detalles de evento')
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    getRatings,
    getRatingsServices,
    getRatingsByServiceId,
    getRatingsEventDetails,
    getRatingsByEventDetailId,
    getRatingsByServicesByUser,
    getRatingsByEventDetailsByUser,
    saveRating
}