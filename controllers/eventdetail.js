// ====================================================
//      Controller EventDetail
//      By ARYA Team ©
// ====================================================

const EventDetail = require('../models').EventDetail;
const Event = require('../models').Event;
const { saveBitacora } = require('../services/bitacora');
const EventArray = require('../services/eventarrays');
const EventDetailFilter = require('../services/eventdetailpatient');
const { getEventPatientInvitations } = require('../services/patient');
const { getEventPeopleInvitations } = require('../services/people');

const EventResource = require('../models').EventResource;
const Guest = require('../models').Guest;
const Participant = require('../models').EventParticipant;
const EventResultParameter = require('../models').EventResultParameter;
const Resource = require('../models').Resource;
const ResultParameter = require('../models').ResultParameter;
const EventDetailPatient = require('../models').EventDetailPatient;
const Patient = require('../models').Patient;

const Post = require('../models').Post;
const models = require('../models');
const { uploadFile } = require('../controllers/upload');
const PostType = require('../models').PostType;
const serviceMail = require('../services/email');
const notification = require('../services/notification');

//======================================
//Mostrar todos los detalle eventos
//======================================
async function getEventDetails(req, res) {
    await EventDetail.findAll({
            include: [{
                    required: false,
                    model: Event,
                    include: [models.EventType, models.RatingType]
                }, {
                    required: false,
                    model: Participant
                },
                {
                    required: false,
                    model: Guest
                },
                {
                    required: false,
                    model: Resource
                },
                {
                    required: false,
                    model: ResultParameter
                },
                {
                    required: false,
                    model: models.Post
                },
                {
                    required: false,
                    model: models.EventContingency,
                    include: [models.EventCancelType]
                },
                {
                    required: false,
                    model: models.Rating,
                    include: [models.RatingType]
                }
            ]
        })
        .then(eventDetails => {
            if (eventDetails.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No se ha registrado ningun detalle de actividades.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Correcto.',
                    eventDetails
                })
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=================================
//Mostrar detalle de actividad por id
//=================================
async function getEventDetailById(req, res) {
    let id = req.params.id;
    await EventDetail.findOne({
            where: { id },
            include: [{
                    required: false,
                    model: Event,
                    include: [models.EventType, models.RatingType]
                }, {
                    required: false,
                    model: Participant
                },
                {
                    required: false,
                    model: Guest
                },
                {
                    required: false,
                    model: Resource
                },
                {
                    required: false,
                    model: ResultParameter
                },
                {
                    required: false,
                    model: models.Post
                },
                {
                    required: false,
                    model: models.EventContingency,
                    include: [models.EventCancelType]
                },
                {
                    required: false,
                    model: models.Rating,
                    include: [models.RatingType]
                }
            ]
        })
        .then(eventDetail => {
            if (eventDetail === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay registrado un detalle de actividad con ese id.',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    eventDetail
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
//Mostrar todos los detalles de actividades por estatus
//==============================================
async function getEventDetailsByStatus(req, res) {
    let status = req.params.status;
    await EventDetail.findAll({
            where: { status },
            include: [{
                    required: false,
                    model: Event,
                    include: [models.EventType, models.RatingType]
                }, {
                    required: false,
                    model: Participant
                },
                {
                    required: false,
                    model: Guest
                },
                {
                    required: false,
                    model: Resource
                },
                {
                    required: false,
                    model: ResultParameter
                },
                {
                    required: false,
                    model: models.Post
                },
                {
                    required: false,
                    model: models.EventContingency,
                    include: [models.EventCancelType]
                },
                {
                    required: false,
                    model: models.Rating,
                    include: [models.RatingType]
                }
            ]
        })
        .then(async eventDetails => {
            if (eventDetails.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay detalles de actividades registrados con el estatus ${status}`,
                });
            } else {
                await eventDetails.forEach((item) => {
                    if (item.statusDetail === 'finished') {
                        item.Ratings.forEach((rating) => {
                            if (rating.userId == req.user.id && rating.eventDetailId == item.id) {
                                item.status = false;
                                return
                            }
                        });
                    }
                });
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    eventDetails
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

//=========================================================
//Mostrar todos los detalles de actividades por estatus
// created scheduled canceled rescheduled finished
//=========================================================
async function getEventDetailsByStatusDetail(req, res) {
    let statusDetail = req.params.statusDetail;
    await EventDetail.findAll({
            where: { statusDetail },
            include: [{
                    required: false,
                    model: Event,
                    include: [models.EventType, models.RatingType]
                }, {
                    required: false,
                    model: Participant
                },
                {
                    required: false,
                    model: Guest
                },
                {
                    required: false,
                    model: Resource
                },
                {
                    required: false,
                    model: ResultParameter
                },
                {
                    required: false,
                    model: models.Post
                },
                {
                    required: false,
                    model: models.EventContingency,
                    include: [models.EventCancelType]
                },
                {
                    required: false,
                    model: models.Rating,
                    include: [models.RatingType]
                }
            ]
        })
        .then(async eventDetails => {
            if (eventDetails.length === 0) {
                return res.status(200).json({
                    ok: true,
                    message: `No hay detalles de actividades registrados con el estatus ${statusDetail}`,
                });
            } else {
                if (statusDetail === 'finished') {
                    await eventDetails.forEach((item) => {
                        item.Ratings.forEach((rating) => {
                            if (rating.userId == req.user.id && rating.eventDetailId == item.id) {
                                item.status = false;
                                return
                            }
                        });
                    });
                    res.status(200).json({
                        ok: true,
                        message: 'correcto',
                        eventDetails
                    });
                } else
                    res.status(200).json({
                        ok: true,
                        message: 'correcto',
                        eventDetails
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
//Crear detalle de evento
//==============================
/*statuses
created - scheduled (agendado) - rescheduled - canceled - finished*/
async function saveEventDetail(req, res) {
    let body = req.body;

    let eventDetail = {
        name: body.name,
        plannedDate: body.plannedDate,
        time: body.time,
        place: body.place,
        description: body.description,
        eventId: body.eventId,
        statusDetail: 'created',
        diffusion: Number(body.diffusion),
        status: body.status || true,
        evaluation: body.evaluation || false
    }

    today = new Date().toISOString().slice(0, 10);
    if (eventDetail.plannedDate < today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor o igual que la fecha actual ${today}`
        });
    else {
        //revisar si los parametros de resultado tienen los valores correctos
        if (body.resultParameters) {
            body.resultParameters.forEach((item) => {
                let minValue = Number(item.minValue);
                let maxValue = Number(item.maxValue);
                if (minValue > maxValue) {
                    return res.status(200).json({
                        ok: false,
                        message: 'Los valores mínimos para los parámetros de resultados no pueden ser mayores al los valores máximos.'
                    });
                }
            });
        }
        await EventDetail.create(eventDetail)
            .then(async eventDetail => {
                saveBitacora('EventDetail', eventDetail.id, 'create event detail', 'create', req.user.id);
                await EventResource.bulkCreate(EventArray.eventResourcesArray(body.resources, eventDetail.id));
                if (body.guests)
                    await Guest.bulkCreate(EventArray.eventGuestsArray(body.guests, eventDetail.id));
                await Participant.bulkCreate(EventArray.eventParticipantsArray(body.participants, eventDetail.id));
                await EventResultParameter.bulkCreate(EventArray.eventResultParametersArray(body.resultParameters, eventDetail.id));

                return res.status(200).json({
                    ok: true,
                    message: 'Detalle del evento creado con éxito',
                    eventDetail
                });
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Tipo de evento no creado, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//==============================
//Actualizar detalle de evento
//==============================
async function updateEventDetail(req, res) {
    let id = req.params.id;
    let body = req.body;

    today = new Date().toISOString().slice(0, 10);
    if (body.plannedDate < today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor o igual que la fecha actual ${today}`
        });
    else {
        //revisar si los parametros de resultado tienen los valores correctos
        if (body.resultParameters) {
            body.resultParameters.forEach((item) => {
                let minValue = Number(item.minValue);
                let maxValue = Number(item.maxValue);
                if (minValue > maxValue) {
                    return res.status(200).json({
                        ok: false,
                        message: 'Los valores mínimos para los parámetros de resultados no pueden ser mayores al los valores máximos.'
                    });
                }
            });
        }

        await EventDetail.findOne({ where: { id: id } })
            .then(async eventDetail => {
                if (eventDetail === null)
                    return res.status(200).json({
                        ok: false,
                        message: `No existe el detalle de evento con id = ${id}.`
                    })
                else {
                    if (eventDetail.statusDetail === 'created') {
                        await EventDetail.update(body, { where: { id: id } });

                        await Guest.destroy({ where: { eventDetailId: eventDetail.id } });
                        await Guest.bulkCreate(EventArray.eventGuestsArray(body.guests, eventDetail.id));

                        await Participant.destroy({ where: { eventDetailId: eventDetail.id } })
                        await Participant.bulkCreate(EventArray.eventParticipantsArray(body.participants, eventDetail.id));

                        const resources = await eventDetail.getResources();
                        eventDetail.removeResources(resources);
                        await EventResource.bulkCreate(EventArray.eventResourcesArray(body.resources, eventDetail.id));

                        const resultParameters = await eventDetail.getResultParameters();
                        eventDetail.removeResultParameters(resultParameters);
                        await EventResultParameter.bulkCreate(EventArray.eventResultParametersArray(body.resultParameters, eventDetail.id));

                        saveBitacora('EventDetail', eventDetail.id, 'update event detail', 'update', req.user.id);
                        res.status(200).json({
                            ok: true,
                            message: 'Detalle de evento actualizado con éxito',
                            eventDetail
                        });
                    } else
                        return res.status(200).json({
                            ok: false,
                            message: 'No se ha podido realizar la operación. Error de estado.'
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                    error: err.message
                });
            })
    }
}

//==================================
//Eliminar detalle de evento por id
//==================================
async function deleteEventDetail(req, res) {
    let id = req.params.id;

    var eventDetail = await EventDetail.findOne({ where: { id: id } });

    if (eventDetail.statusDetail === 'created') {

        await Guest.destroy({ where: { eventDetailId: eventDetail.id } });

        await Participant.destroy({ where: { eventDetailId: eventDetail.id } })

        const resources = await eventDetail.getResources();
        eventDetail.removeResources(resources);

        const resultParameters = await eventDetail.getResultParameters();
        eventDetail.removeResultParameters(resultParameters);

        await EventDetail.destroy({ where: { id: id } })
            .then(async data => {
                if (data == 1) {
                    //saveBitacora('EventType', id, 'delete type', 'delete', req.user.id);

                    res.status(200).json({
                        ok: true,
                        message: 'Detalle de evento eliminado con éxito',
                        data
                    });
                } else {
                    res.status(200).json({
                        ok: false,
                        message: `No existe el detalle de evento con id = ${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: `No se pudo eliminar el tipo de evento con id = ${id}.`,
                    error: err.message
                });
            });
    } else
        return res.status(200).json({
            ok: false,
            message: 'No se ha podido realizar la operación. Error de estado.'
        })
}

//=====================================
//Activar desactivar detalle de evento
//=====================================
async function statusEventDetail(req, res) {
    let id = req.params.id;
    var eventDetail;

    await EventDetail.findOne({ where: { id } })
        .then(data => {
            if (data === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un detalle de evento con el id requerido',
                });
            } else {
                eventDetail = data;
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

    if (eventDetail.statusDetail === 'created') {
        if (eventDetail.status === true)
            change = false;

        await EventDetail.update({ status: change }, { where: { id: id } })
            .then(async data => {
                saveBitacora('EventDetail', eventDetail.id, 'update event detail status', 'update status', req.user.id);

                await Guest.update({ status: change }, { where: { eventDetailId: eventDetail.id } });

                await Participant.update({ status: change }, { where: { eventDetailId: eventDetail.id } })

                res.status(200).json({
                    ok: true,
                    message: 'Detalle de evento actualizado con éxito',
                    data
                });
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: `No se pudo actualizar el detalle de evento con id = ${id}.`,
                    error: err.message
                });
            });
    } else
        return res.status(200).json({
            ok: false,
            message: 'No se ha podido realizar la operación. Error de estado.'
        })
}

//=================================================
//Agendar detalle actividad y crear post asociado
//=================================================
async function scheduleEventDetail(req, res) {
    let id = req.params.id;
    let body = req.body;
    body.diabetesTypes = JSON.parse(body.diabetesTypes)
    body.all = JSON.parse(body.all)
    body.male = JSON.parse(body.male)
    body.female = JSON.parse(body.female)

    today = new Date().toISOString().slice(0, 10);
    console.log(body);
    if (body.realDate < today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor o igual que la fecha actual ${today}`
        });
    else {
        await EventDetail.findOne({ where: { id: id } })
            .then(async eventDetail => {
                if (eventDetail === null)
                    return res.status(200).json({
                        ok: false,
                        message: `No existe el detalle de evento con id = ${id}.`
                    })
                else {
                    if (eventDetail.statusDetail === 'created') {
                        console.log('entre');
                        //aqui los eventdetails
                        var participnts = await Participant.findAll({ where: { eventDetailId: eventDetail.id }, include: [{ model: models.User, required: true }] })
                        var patients = await EventDetailFilter.filterPatients(body);
                        if (patients.length === 0)
                            return res.status(200).json({
                                ok: false,
                                message: 'No existen pacientes que cumplan con las condiciones seleccionadas.'
                            })
                        else {
                            await EventDetailPatient.bulkCreate(EventDetailFilter.arrayEventDetailPatient(patients, id))
                                .catch(err => {
                                    return res.status(400).json({
                                        ok: false,
                                        message: 'Ha ocurrido un error.',
                                        error: err.message
                                    })
                                });
                        }

                        //actualizar el eventDetail
                        console.log(body);
                        await EventDetail.update({
                            realDate: body.realDate,
                            time: body.time,
                            statusDetail: 'scheduled'
                        }, {
                            where: { id: id }
                        });

                        saveBitacora('EventDetail', eventDetail.id, 'schedule event detail', 'update', req.user.id);

                        //enviar correos a los invitados
                        var guests = await Guest.findAll({ where: { eventDetailId: id } });
                        if (!serviceMail.sendMultipleInvitationMails(guests, 'Invitación al evento', 'guestInvitation', eventDetail, body))
                            return res.status(200).json({
                                ok: false,
                                message: 'No se han podido enviar los correos a los invitados.'
                            })

                        //crear el post
                        const postType = await PostType.findOne({ where: { name: 'Actividades' } });

                        let post = {
                            title: body.title,
                            content: body.content,
                            author: body.author,
                            status: body.status || true,
                            organizationId: body.organizationId,
                            categoryId: body.categoryId,
                            postTypeId: postType.id,
                            eventDetailId: eventDetail.id
                        }

                        await Post.create(post)
                            .then(async post => {
                                await notification.newPublication(post.id);
                                await notification.eventInvitation(8, id, 'event schedule', patients, participnts);
                                saveBitacora('Post', post.id, post.title, 'create', req.user.id);
                                saveImage(req, res, post.id);
                            })
                            .catch(err => {
                                console.log(err.message);
                                return res.status(500).json({
                                    ok: false,
                                    message: 'Error al crear el post.',
                                    error: err
                                });
                            });;
                    } else
                        return res.status(200).json({
                            ok: false,
                            message: 'No se ha podido realizar la operación. Error de estado.'
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                    error: err.message
                });
            })
    }
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

//=================================================
//Cancelar detalle actividad
//=================================================
async function cancelEventDetail(req, res) {
    let id = req.params.id;
    let body = req.body;

    await EventDetail.findOne({ where: { id } })
        .then(async eventDetail => {
            if (eventDetail === null)
                return res.status(200).json({
                    ok: false,
                    message: `No existe el detalle de evento con id = ${id}.`
                })
            else {
                if (eventDetail.statusDetail === 'scheduled' || eventDetail.statusDetail === 'rescheduled') {
                    let contingency = {
                        eventDetailId: eventDetail.id,
                        eventCancelId: body.eventCancelId,
                        initialDate: eventDetail.realDate,
                        initialTime: eventDetail.time,
                        status: true
                    }

                    eventDetail.statusDetail = 'canceled';
                    await eventDetail.save();
                    const cancel = models.EventCancelType.findOne({ where: { id: body.eventCancelId } })
                    var participnts = await Participant.findAll({ where: { eventDetailId: eventDetail.id }, include: [{ model: models.User, required: true }] });
                    var pats = await EventDetailPatient.findAll({ where: { eventDetailId: eventDetail.id } });
                    await notification.eventContingency(10, id, 'event cancel', pats, participnts);
                    saveBitacora('EventDetail', eventDetail.id, 'cancel event detail', 'update', req.user.id);

                    //enviar correos a los invitados
                    var guests = await Guest.findAll({ where: { eventDetailId: id } });
                    if (!serviceMail.sendMultipleInvitationMails(guests, 'Cancelación de evento', 'guestCancel', eventDetail, cancel))
                        return res.status(200).json({
                            ok: false,
                            message: 'No se han podido enviar los correos a los invitados.'
                        })

                    await models.EventContingency.create(contingency)
                        .then(async contingency => {
                            saveBitacora('EventContingency', contingency.id, 'create contingency', 'create', req.user.id);
                            getEventDetailById(req, res);
                        })
                        .catch(err => {
                            res.status(500).json({
                                ok: false,
                                message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                                error: err.message
                            });
                        });;
                } else
                    return res.status(200).json({
                        ok: false,
                        message: 'No se ha podido realizar la operación. Error de estado.'
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                error: err.message
            });
        })
}

//=================================================
//Reprogramar detalle evento
//=================================================
async function resheduleEventDetail(req, res) {
    let id = req.params.id;
    let body = req.body;

    today = new Date().toISOString().slice(0, 10);
    if (body.realDate < today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor o igual que la fecha actual ${today}`
        });
    else {
        await EventDetail.findOne({ where: { id } })
            .then(async eventDetail => {
                if (eventDetail === null)
                    return res.status(200).json({
                        ok: false,
                        message: `No existe el detalle de evento con id = ${id}.`
                    })
                else {
                    if (eventDetail.statusDetail === 'scheduled' || eventDetail.statusDetail === 'rescheduled') {
                        let contingency = {
                            eventDetailId: eventDetail.id,
                            eventCancelId: body.eventCancelId,
                            initialDate: eventDetail.realDate,
                            initialTime: eventDetail.time,
                            status: true
                        }

                        eventDetail.statusDetail = 'rescheduled';
                        eventDetail.realDate = body.realDate;
                        eventDetail.time = body.time;
                        await eventDetail.save();
                        var participnts = await Participant.findAll({ where: { eventDetailId: eventDetail.id }, include: [{ model: models.User, required: true }] });
                        var pats = await EventDetailPatient.findAll({ where: { eventDetailId: eventDetail.id } });
                        await notification.eventContingency(9, id, 'event reschedule', pats, participnts);
                        saveBitacora('EventDetail', eventDetail.id, 'reschedule event detail', 'update', req.user.id);

                        //enviar correos a los invitados
                        var guests = await Guest.findAll({ where: { eventDetailId: id } });
                        if (!serviceMail.sendMultipleInvitationMails(guests, 'Reprogramación de evento', 'guestReschedule', eventDetail, body))
                            return res.status(200).json({
                                ok: false,
                                message: 'No se han podido enviar los correos a los invitados.'
                            })

                        await models.EventContingency.create(contingency)
                            .then(async contingency => {
                                saveBitacora('EventContingency', contingency.id, 'create contingency', 'create', req.user.id);
                                getEventDetailById(req, res);
                            })
                            .catch(err => {
                                res.status(500).json({
                                    ok: false,
                                    message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                                    error: err.message
                                });
                            });;
                    } else
                        return res.status(200).json({
                            ok: false,
                            message: 'No se ha podido realizar la operación. Error de estado.'
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                    error: err.message
                });
            })
    }
}

//=================================================
//Finalizar actividad
//=================================================
async function finishEventDetail(req, res) {
    let id = req.params.id;

    await EventDetail.findOne({ where: { id } })
        .then(async eventDetail => {
            if (eventDetail === null)
                return res.status(200).json({
                    ok: false,
                    message: `No existe el detalle de evento con id = ${id}.`
                })
            else {
                if (eventDetail.statusDetail === 'scheduled' || eventDetail.statusDetail === 'rescheduled') {
                    eventDetail.statusDetail = 'finished';
                    await eventDetail.save();
                    var participnts = await Participant.findAll({ where: { eventDetailId: eventDetail.id }, include: [{ model: models.User, required: true }] });
                    var pats = await EventDetailPatient.findAll({ where: { eventDetailId: eventDetail.id } });
                    await notification.eventContingency(14, id, 'event finished', pats, participnts);
                    saveBitacora('EventDetail', eventDetail.id, 'finished event detail', 'update', req.user.id);
                    getEventDetailById(req, res);
                } else
                    return res.status(200).json({
                        ok: false,
                        message: 'No se ha podido realizar la operación. Error de estado.'
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el detalle evento con id = ${id}.`,
                error: err.message
            });
        })
}

//=========================================
//Event patients de un detalle
//=========================================
async function getEventDetailPatientsById(req, res) {
    var id = req.params.id;

    await EventDetail.findOne({
            where: { id: id },
            include: [{
                model: Patient
            }]
        })
        .then(async eventDetail => {
            if (eventDetail === null)
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un detalle de evento con este id.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Detalle de evento.',
                    eventDetail
                })
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `Hubo un error con el detalle evento con id = ${id}.`,
                error: err.message
            });
        })
}

async function getEventDetailsByUser(req, res) {
    const id = req.user.id;
    if (req.user.Patient !== null)
        await getEventPatientInvitations(req, res, id)
    else
        await getEventPeopleInvitations(req, res, id)
}

//=========================================
// Párametros de resultado de un detalle
//=========================================
async function getEventDetailParametersById(req, res) {
    var id = req.params.id;

    await EventDetail.findOne({
            where: { id },
            include: [{
                model: ResultParameter
            }]
        })
        .then(async eventDetail => {
            if (eventDetail === null)
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un detalle de evento con este id.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Detalle de evento.',
                    resultParameters: eventDetail.ResultParameters
                })
        }).catch(err => {
            res.status(500).json({
                ok: false,
                message: `Hubo un error con el detalle evento con id = ${id}.`,
                error: err.message
            });
        })
}

//=================================================
// Registrar Párametros de resultado de un detalle
//=================================================
async function parametersEventDetailResults(req, res) {
    try {
        const id = req.params.id;
        const detail = await EventDetail.findOne({ where: { id } })
        if (!req.body.Results)
            return res.status(400).json({
                ok: false,
                message: `Los resultados vienen vacíos.`
            });
        if (detail.evaluation === false) {
            results = req.body.Results;
            await results.forEach((item) => {
                EventResultParameter.update({ realValue: item.realValue }, { where: { eventDetailId: id, resultParameterId: item.resultParameterId } })
            });
            detail.evaluation = true;
            await detail.save();
            return res.status(200).json({
                ok: true,
                message: `Los resultados del detalle evento con id = ${id} han sido actualizados correctamente.`
            });
        } else
            return res.status(400).json({
                ok: false,
                message: `Los resultados del detalle evento con id = ${id} ya fueron registrados.`
            });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Hubo un error con el detalle evento con id = ${id}.`,
            error: err.message
        });
    }
}

module.exports = {
    getEventDetails,
    getEventDetailById,
    getEventDetailsByStatus,
    getEventDetailsByStatusDetail,
    saveEventDetail,
    updateEventDetail,
    deleteEventDetail,
    statusEventDetail,
    scheduleEventDetail,
    cancelEventDetail,
    resheduleEventDetail,
    finishEventDetail,
    getEventDetailPatientsById,
    getEventDetailsByUser,
    getEventDetailParametersById,
    parametersEventDetailResults
}