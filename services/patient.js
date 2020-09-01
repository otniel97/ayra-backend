// ====================================================
//      PATIENT SERVICE
//      By ARYA Team ©
// ====================================================

const Patient = require('../models').Patient;
const models = require('../models');

//==============================
//Crear paciente
//==============================
async function savePatient(req, res, user) {
    let body = req.body;
    let appointmentId = req.body.appointmentId;

    let patient = {
        name: body.name,
        surname: body.surname,
        gender: body.gender,
        birthdate: body.birthdate,
        phoneNumber: body.phoneNumber,
        maritalStatus: body.maritalStatus,
        address: body.address,
        cedula: body.cedula,
        rif: body.rif,
        userId: user.id,
        status: body.status || true,
        transaction: 1
    }

    await Patient.create(patient)
        .then(async patient => {
            await models.Appointment.update({ patientId: patient.id }, { where: { id: appointmentId } })
                .then(appointment => {
                    res.status(200).json({
                        ok: true,
                        message: 'Usuario y Paciente creado con éxito',
                        patient
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        ok: false,
                        message: `Paciente creado, no se actualizó id paciente para cita inicial = ${id}.`,
                        error: err.parent.detail
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Paciente no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//=================================
//Citas de un paciente
//=================================
async function getAppointmentsByPatient(res, patientId) {

    let patient = await models.Patient.findOne({ where: { id: patientId } })
    if (!patient) {
        res.status(400).json({
            ok: false,
            message: 'no existe el paciente'
        })
    } else {
        await models.Appointment.findAll({
                where: { patientId },
                include: [{
                        model: models.Patient,
                        required: false
                    },
                    {
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
                        model: models.AppointmentCancelType,
                        required: false
                    }
                ],
            })
            .then(appointments => {
                if (appointments.length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: `No hay citas del paciente ${patientId}`
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `Citas del paciente ${patientId}`,
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
//Citas de un paciente por status
//=================================
async function getAppointmentsByPatientByStatus(res, patientId, statusAppointment) {

    let patient = await models.Patient.findOne({ where: { id: patientId } })
    if (!patient) {
        res.status(400).json({
            ok: false,
            message: 'no existe el paciente'
        })
    } else {
        await models.Appointment.findAll({
                where: { patientId, statusAppointment },
                include: [{
                        model: models.Patient,
                        required: false
                    },
                    {
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
                        model: models.AppointmentCancelType,
                        required: false
                    }
                ],
            })
            .then(appointments => {
                if (appointments.length === 0) {
                    res.status(200).json({
                        ok: true,
                        message: `No hay citas del paciente ${patientId}`
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `Citas del paciente ${patientId}`,
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

async function getEventPatientInvitations(req, res, userId) {
    await models.EventDetail.findAll({
            where: { statusDetail: ['scheduled', 'rescheduled'] },
            include: [{
                    required: false,
                    model: models.Post
                },
                {
                    required: true,
                    model: models.Patient,
                    where: { userId }
                }
            ]
        })
        .then(eventDetails => {
            if (eventDetails.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No tiene invitaciones a actividades actualmente.'
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

module.exports = {
    savePatient,
    getAppointmentsByPatient,
    getAppointmentsByPatientByStatus,
    getEventPatientInvitations,
}