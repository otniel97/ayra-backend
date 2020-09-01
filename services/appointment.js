// ====================================================
//      APPOINTMENT SERVICE
//      By ARYA Team ©
// ====================================================

const Appointment = require('../models').Appointment;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');
const serviceMail = require('../services/email');
const notification = require('../services/notification');

//valida ids de entidades relacionados a la cita y retorna horarios disponibles
async function validateIds(res, prePatientId, patientId, typeId, serviceId, personId, number) {
    if (prePatientId) {
        let prePatient = await models.PrePatient.findOne({ where: { id: prePatientId } })
        if (!prePatient) {
            res.status(400).json({
                ok: false,
                message: 'no existe el pre paciente'
            })
        }
    }

    if (patientId) {
        let patient = await models.Patient.findOne({ where: { id: patientId } })
        if (!patient) {
            res.status(400).json({
                ok: false,
                message: 'no existe el paciente'
            })
        }
    }

    let type = await models.AppointmentType.findOne({ where: { id: typeId } })
    if (!type) {
        res.status(400).json({
            ok: false,
            message: 'no existe el tipo de cita'
        })
    }

    let service = await models.Service.findOne({ where: { id: serviceId } })
    if (!service) {
        res.status(400).json({
            ok: false,
            message: 'no existe el servicio'
        })
    }

    let doctor = await models.People.findOne({ where: { id: personId }, include: models.Timetable })
    if (!doctor) {
        res.status(400).json({
            ok: false,
            message: 'no existe el doctor'
        })
    } else {
        let times = doctor.Timetables;
        var timetables = [];
        times.forEach((item) => {
            if (item.dayNumber === number) {
                var newTimetable = {
                    timetableId: item.id,
                    day: item.day,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd,
                    description: item.description,
                    maxPatients: item.maxPatients
                }
                timetables.push(newTimetable);
            }
        });
        if (timetables.length === 0) {
            res.status(400).json({
                ok: false,
                message: 'el doctor no tiene horarios para este día'
            })
        } else
            return timetables
    }
}

//creación de la cita
async function saveAppointment(req, res, pre) {
    let timetable = await models.Timetable.findOne({ where: { id: pre.timetableId } })
    if (!timetable) {
        res.status(400).json({
            ok: false,
            message: 'no existe el horario'
        })
    } else {
        await models.Appointment.findAll({
                where: {
                    personId: pre.personId,
                    date: pre.date,
                    dayNumber: pre.dayNumber,
                    timetableId: pre.timetableId
                }
            })
            .then(async appointments => {
                if (appointments.length === 0) {
                    await Appointment.create(pre)
                        .then(async appointment => {
                            if (appointment.patientId === null) {
                                var prePatient = await models.PrePatient.findOne({ where: { id: appointment.prePatientId } });
                                var timetable = await models.Timetable.findOne({ where: { id: appointment.timetableId } });
                                await notification.newAppointmentAdmission(appointment.personId);
                                //contexto para el correo
                                var context = {
                                    name: prePatient.name,
                                    day: timetable.day,
                                    date: appointment.date,
                                    timeStart: timetable.timeStart,
                                    timeEnd: timetable.timeEnd
                                }

                                if (!serviceMail.sendMail('Cita', prePatient.email, 'appointmentNotice', context))
                                    return res.status(200).json({
                                        ok: false,
                                        message: 'No se ha podido enviar el corro'
                                    })
                            }
                            saveBitacora('Appointment', appointment.id, appointment.description, 'appointment create', req.user.id);
                            await notification.newAppointment(appointment.personId, appointment.patientId);
                            await searchAppointment(res, appointment);
                        })
                        .catch(err => {
                            res.status(500).send({
                                ok: false,
                                message: 'Cita no creada, ha ocurrido un error',
                                error: err.message
                            });
                        });
                } else {
                    await models.Timetable.findOne({ where: { id: pre.timetableId } })
                        .then(async timetable => {
                            if (timetable === null) {
                                return res.status(400).json({
                                    ok: false,
                                    message: 'no existe el horario seleccionado'
                                })
                            } else {
                                if (appointments.length < timetable.maxPatients) {
                                    await Appointment.create(pre)
                                        .then(async appointment => {
                                            if (appointment.patientId === null) {
                                                var prePatient = await models.PrePatient.findOne({ where: { id: appointment.prePatientId } });
                                                var timetable = await models.Timetable.findOne({ where: { id: appointment.timetableId } });
                                                await notification.newAppointmentAdmission(appointment.personId);
                                                //contexto para el correo
                                                var context = {
                                                    name: prePatient.name,
                                                    day: timetable.day,
                                                    date: appointment.date,
                                                    timeStart: timetable.timeStart,
                                                    timeEnd: timetable.timeEnd
                                                }

                                                if (!serviceMail.sendMail('Cita', prePatient.email, 'appointmentNotice', context))
                                                    return res.status(200).json({
                                                        ok: false,
                                                        message: 'No se ha podido enviar el corro'
                                                    })
                                            }
                                            saveBitacora('Appointment', appointment.id, appointment.description, 'appointment create', req.user.id);
                                            await notification.newAppointment(appointment.personId, appointment.patientId);
                                            await searchAppointment(res, appointment);
                                        })
                                        .catch(err => {
                                            res.status(500).send({
                                                ok: false,
                                                message: 'Cita no creada, ha ocurrido un error',
                                                error: err.message
                                            });
                                        });;
                                } else {
                                    return res.status(400).json({
                                        ok: false,
                                        message: 'Las citas están ocupadas en este horario, por favor escoger otro',
                                    })
                                }
                            }
                        })
                        .catch(err => {
                            return res.status(400).json({
                                ok: false,
                                message: 'Ha ocurrido un error',
                                error: err.message
                            })
                        });
                }
            })
            .catch(err => {
                return res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error',
                    error: err.message
                })
            });
    }
}

async function searchAppointment(res, appointment) {
    await models.Appointment.findOne({
            where: { id: appointment.id },
            include: [{
                    model: models.PrePatient,
                    required: false
                },
                {
                    model: models.Patient,
                    required: false
                }, {
                    model: models.AppointmentType,
                    required: false
                },
                {
                    model: models.Service,
                    required: false
                },
                {
                    model: models.People,
                    required: false
                },
                {
                    model: models.Timetable,
                    required: false
                }
            ],
        })
        .then(appoint => {
            res.status(200).json({
                ok: true,
                message: 'Cita creada con éxito',
                appoint
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Cita no creada, ha ocurrido un error',
                error: err.message
            });
        });;
}

//creación de registro consulta cita
async function saveAppointmentHistory(req, res, history) {
    let appointment = await Appointment.findOne({ where: { id: history.appointmentId } })
    if (!appointment) {
        res.status(400).json({
            ok: false,
            message: 'no existe la cita a la cual se quiere registrar historial'
        })
    } else {
        await models.MedicalRecord.findOne({ where: { patientId: appointment.patientId }, include: [models.Patient] })
            .then(async medicalRecord => {
                if (medicalRecord !== null) {
                    history.medicalRecordId = medicalRecord.id;
                    await models.AppointmentHistory.create(history)
                        .then(async history => {
                            saveBitacora('AppointmentHistory', history.id, history.description, 'appointment history create', req.user.id);
                            appointment.statusAppointment = 'completed';
                            appointment.save();
                            const user = await models.User.findOne({ where: { id: medicalRecord.Patient.userId } })
                            if (!user.status) {
                                user.status = true;
                                user.save();
                            }
                            await saveRiskFactor(req, res, history);
                            await saveIllness(req, res, history);
                            await notification.appointmentCompleted(appointment.patientId);
                            searchAppointmentHistory(res, history)
                        })
                        .catch(err => {
                            res.status(500).send({
                                ok: false,
                                message: 'Historial no creado, ha ocurrido un error',
                                error: err.message
                            });
                        });;
                } else {
                    res.status(400).send({
                        ok: false,
                        message: 'No se encuentra historial médico para asociar registro de consulta del paciente'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Historial no creado, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

async function saveRiskFactor(req, res, history) {
    var riskFactorsArray = [];
    //recorrer el arreglo de riskFactors
    req.body.riskFactors.forEach((item) => {
        var newRiskFactorHistory = {
            status: true,
            riskFactorId: item,
            appointmentHistoryId: history.id
        }
        riskFactorsArray.push(newRiskFactorHistory);
    });
    await models.RiskFactorDiagnosis.bulkCreate(riskFactorsArray)
        .then(riskFactorDiagnosis => {
            return riskFactorDiagnosis;
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.parent.detail
            })
        });
}

async function saveIllness(req, res, history) {
    var IllnessesArray = [];
    //recorrer el arreglo de riskFactors
    req.body.illness.forEach((item) => {
        var newIllnessHistory = {
            status: true,
            illnessId: item,
            appointmentHistoryId: history.id
        }
        IllnessesArray.push(newIllnessHistory);
    });
    await models.IllnessDiagnosis.bulkCreate(IllnessesArray)
        .then(illnessDiagnosis => {
            return illnessDiagnosis;
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.parent.detail
            })
        });
}

async function searchAppointmentHistory(res, history) {
    await models.AppointmentHistory.findOne({
            where: { id: history.id },
            include: [{
                    model: models.Appointment,
                    required: false
                },
                {
                    model: models.MedicalRecord,
                    required: false
                },
                {
                    model: models.RiskFactor,
                    required: false
                },
                {
                    model: models.Illness,
                    required: false
                }
            ],
        })
        .then(appoint => {
            res.status(200).json({
                ok: true,
                message: 'Registro de consulta creado con éxito',
                appoint
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Registro de consulta no creado, ha ocurrido un error',
                error: err.message
            });
        });;
}

module.exports = {
    validateIds,
    saveAppointment,
    saveAppointmentHistory
}