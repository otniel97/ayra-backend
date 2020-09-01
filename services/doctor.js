// ====================================================
//      PEOPLE DOCTOR SERVICE
//      By ARYA Team ©
// ====================================================

const Appointment = require('../models').Appointment;
const models = require('../models');

//==============================
//Citas de un doctor
//==============================
async function getAppointmentsByPerson(res, personId) {

    let doctor = await models.People.findOne({ where: { id: personId } })
    if (!doctor) {
        res.status(400).json({
            ok: false,
            message: 'no existe el doctor'
        })
    } else {
        await models.Appointment.findAll({
                where: { personId },
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
                    },
                    {
                        model: models.AppointmentHistory,
                        include: [models.RiskFactor, models.Illness],
                        required: false
                    },
                    {
                        model: models.AppointmentCancelType,
                        required: false
                    }
                ],
            })
            .then(appointments => {
                if (appointments.length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: `No hay citas del doctor`
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `Citas del doctor`,
                        appointments
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Citas no encontradas, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//==============================
//Citas de un doctor por status
//==============================
async function getAppointmentsByPersonByStatus(res, personId, statusAppointment) {

    let doctor = await models.People.findOne({ where: { id: personId } })
    if (!doctor) {
        res.status(400).json({
            ok: false,
            message: 'no existe el doctor'
        })
    } else {
        await models.Appointment.findAll({
                where: { personId, statusAppointment },
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
                    },
                    {
                        model: models.AppointmentHistory,
                        include: [models.RiskFactor, models.Illness],
                        required: false
                    },
                    {
                        model: models.AppointmentCancelType,
                        required: false
                    }
                ],
            })
            .then(appointments => {
                if (appointments.length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: `No hay citas del doctor con status ${statusAppointment}`
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `Citas del doctor con status ${statusAppointment}`,
                        appointments
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Citas no encontradas, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//=================================
//Citas de un doctor por tipo cita
//=================================
async function getAppointmentsByPersonByType(res, personId, typeId) {

    let doctor = await models.People.findOne({ where: { id: personId } })
    if (!doctor) {
        res.status(400).json({
            ok: false,
            message: 'no existe el doctor'
        })
    } else {
        await models.Appointment.findAll({
                where: { personId, typeId },
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
                    },
                    {
                        model: models.AppointmentHistory,
                        include: [models.RiskFactor, models.Illness],
                        required: false
                    },
                    {
                        model: models.AppointmentCancelType,
                        required: false
                    }
                ],
            })
            .then(appointments => {
                if (appointments.length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: `No hay citas del doctor con tipo cita ${typeId}`
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `Citas del doctor con tipo cita ${typeId}`,
                        appointments
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Citas no encontradas, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

module.exports = {
    getAppointmentsByPerson,
    getAppointmentsByPersonByStatus,
    getAppointmentsByPersonByType
}