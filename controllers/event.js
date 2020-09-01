// ====================================================
//      Controller Event
//      By ARYA Team ©
// ====================================================

const Event = require('../models').Event;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');
const { successMsg, errorMsg } = require('../utils/responses');

//======================================
//Mostrar todos los eventos
//======================================
async function getEvents(req, res) {
    try {
        const events = await Event.findAll({
            include: [{
                    model: models.EventType,
                    required: true
                },
                {
                    model: models.EventDetail,
                    include: [models.EventContingency],
                    required: false
                },
                {
                    model: models.RatingType,
                    required: false
                }
            ]
        })
        events.length ?
            successMsg(res, 200, 'correcto', events) :
            successMsg(res, 200, 'No existen eventos registrados')

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar evento por id
//=================================
async function getEventById(req, res) {
    const id = req.params.id;
    try {
        const event = await Event.findOne({
            where: { id },
            include: [{
                    model: models.EventType,
                    required: true
                },
                {
                    model: models.EventDetail,
                    include: [models.EventContingency],
                    required: false
                },
                {
                    model: models.RatingType,
                    required: false
                }
            ]
        })
        event ?
            successMsg(res, 200, 'correcto', event) :
            successMsg(res, 200, `No existen eventos registrados con el id ${id}`)

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todas los eventos por estatus
//==============================================
async function getEventsByStatus(req, res) {
    const status = req.params.status;
    try {
        const events = await Event.findAll({
            where: { status },
            include: [{
                    model: models.EventType,
                    required: true
                },
                {
                    model: models.EventDetail,
                    include: [models.EventContingency],
                    required: false
                },
                {
                    model: models.RatingType,
                    required: false
                }
            ]
        })
        events.length ?
            successMsg(res, 200, 'correcto', events) :
            successMsg(res, 200, `No existen eventos registrados con status ${status}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear evento
//==============================
async function saveEvent(req, res) {
    const body = req.body;
    const data = {
        name: body.name,
        topic: body.topic,
        description: body.description,
        eventTypeId: body.eventTypeId,
        status: body.status || true
    }

    try {
        const event = await Event.create(data)
        saveBitacora('Event', event.id, event.description, 'create', req.user.id);

        req.params.id = event.id;
        var eventRatingArray = [];
        body.RatingTypes.forEach((item) => {
            var result = {
                ratingTypeId: item.id,
                eventId: event.id
            }
            eventRatingArray.push(result);
        });
        const eventRatingTypes = await models.EventRatingType.bulkCreate(eventRatingArray)
        saveBitacora('EventRatingType', event.id, event.name, 'add rating type to event', req.user.id);

        eventRatingTypes ?
            successMsg(res, 200, `Actividad ${event.name} creada exitosamente.`, event) :
            `Actividad ${event.name} creada exitosamente`

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error',
            error: err.parent.detail
        });
    }
}

//==============================
//Actualizar evento
//==============================
async function updateEvent(req, res) {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ where: { id } })

        if (!event)
            successMsg(res, 200, `No hay actividad registrada con el id: ${id}.`)
        else {
            event.set({...req.body })
            await event.save()
            saveBitacora('Event', event.id, event.description, 'update', req.user.id);
            if (req.body.RatingTypes) {
                const eventRatingTypes = await event.getRatingTypes();
                event.removeRatingTypes(eventRatingTypes);
                var eventRatingArray = [];
                req.body.RatingTypes.forEach((item) => {
                    var result = {
                        ratingTypeId: item.id,
                        eventId: event.id
                    }
                    eventRatingArray.push(result);
                });
                const types = await models.EventRatingType.bulkCreate(eventRatingArray)
                saveBitacora('EventRatingType', event.id, event.name, 'add rating type to event', req.user.id);
            }
            event ?
                successMsg(res, 200, `Actividad ${event.name} actualizada exitosamente.`, event) :
                `Actividad ${event.name} actualizada exitosamente`
        }
    } catch (err) {
        console.error(error.toString())
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error',
            error: err.parent.detail
        });
    }
}

//=====================================
//Activar desactivar evento
//=====================================
async function statusEvent(req, res) {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ where: { id } })

        if (!event)
            successMsg(res, 200, `No hay actividad registrada con el id: ${id}.`)
        else {
            event.set({ status: !event.status })
            await event.save()
            saveBitacora('Event', event.id, event.description, 'update status', req.user.id);
            event ?
                successMsg(res, 200, `Actividad ${event.name} actualizada exitosamente`, event) :
                `Actividad ${event.name} actualizada exitosamente`
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

module.exports = {
    getEvents,
    getEventById,
    getEventsByStatus,
    saveEvent,
    updateEvent,
    statusEvent
}