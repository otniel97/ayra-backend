// ====================================================
//      Controller Appointment
//      By ARYA Team ©
// ====================================================

const models = require('../models');
const appointmentService = require('../services/appointment');
const doctorService = require('../services/doctor');
const patientService = require('../services/patient');
const notification = require('../services/notification');
const { saveBitacora } = require('../services/bitacora');

//==============================
//Horarios disponibles para cita
//==============================
async function availableTimetables(req, res) {
    let body = req.body;

    let pre = {
        patientId: body.patientId,
        prePatientId: body.prePatientId,
        typeId: body.typeId,
        serviceId: body.serviceId,
        personId: body.personId,
        date: body.date,
        description: body.description,
        status: body.status || true,
        statusAppointment: 'pending',
        dayNumber: Number(body.dayNumber)
    }

    today = new Date().toISOString().slice(0, 10);
    if (pre.date <= today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor que la fecha actual ${today}`
        });
    else {
        let timetables = await appointmentService.validateIds(res, pre.prePatientId, pre.patientId, pre.typeId, pre.serviceId, pre.personId, pre.dayNumber);

        res.status(200).json({
            ok: true,
            message: 'Horarios disponibles',
            timetables
        });
    }
}

//==============================
//Crear cita
//==============================
async function saveAppointment(req, res) {
    let body = req.body;

    let pre = {
        patientId: body.patientId || null,
        prePatientId: body.prePatientId || null,
        typeId: body.typeId,
        serviceId: body.serviceId,
        personId: body.personId,
        date: body.date,
        description: body.description,
        status: body.status || true,
        statusAppointment: 'pending',
        dayNumber: Number(body.dayNumber),
        timetableId: Number(body.timetableId),
        qualified: false
    }

    today = new Date().toISOString().slice(0, 10);
    if (pre.date <= today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser mayor que la fecha actual ${today}`
        });
    else
        await appointmentService.saveAppointment(req, res, pre);
}

//==============================
//Crear registro consulta cita
//==============================
async function saveAppointmentHistory(req, res) {
    let appointmentId = req.params.appointmentId;
    let body = req.body;
    console.log(body);
    let history = {
        appointmentId,
        glucoseLevel: body.glucoseLevel,
        height: body.height,
        weight: body.weight,
        bloodPressureUp: body.bloodPressureUp,
        bloodPressureDown: body.bloodPressureDown,
        physicalExamination: body.physicalExamination,
        treatments: body.treatments,
        medicalConditions: body.medicalConditions,
        description: body.description,
        status: body.status || true,
    }

    await appointmentService.saveAppointmentHistory(req, res, history);

}

//=================================
//Cancelar cita
//=================================
async function cancelAppointment(req, res) {
    let id = req.params.appointmentId;
    let cancelId = req.body.cancelId;

    let cancel = await models.AppointmentCancelType.findOne({ where: { id: cancelId } })
    if (!cancel) {
        res.status(400).json({
            ok: false,
            message: 'no existe tipo de cancelación asociada a la cita'
        })
    }

    await models.Appointment.findOne({
            where: { id },
        })
        .then(async appointment => {
            if (appointment === null) {
                res.status(200).json({
                    ok: true,
                    message: "No hay cita con el id requerido"
                });
            } else {
                appointment.statusAppointment = 'canceled';
                appointment.cancelId = cancelId;
                appointment.save();
                await notification.cancelAppointment(appointment.personId, appointment.patientId);
                saveBitacora('Appointment', appointment.id, appointment.description, 'Update status appointment', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: "Cita cancelada",
                    appointment
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Cita no encontrada, ha ocurrido un error',
                error: err.message
            });
        });;
}

//==============================
//Citas de un doctor por id
//==============================
async function getAppointmentsByPerson(req, res) {
    let personId = req.params.personId;
    await doctorService.getAppointmentsByPerson(res, personId);
}

//==============================
//Citas de un doctor por status
//==============================
async function getAppointmentsByPersonByStatus(req, res) {
    let personId = req.params.personId;
    let statusAppointment = req.params.status;

    await doctorService.getAppointmentsByPersonByStatus(res, personId, statusAppointment);
}

//=================================
//Citas de un doctor por tipo cita
//=================================
async function getAppointmentsByPersonByType(req, res) {
    let personId = req.params.personId;
    let typeId = req.params.typeId;

    await doctorService.getAppointmentsByPersonByType(res, personId, typeId);
}

//=================================
//Citas de un paciente
//=================================
async function getAppointmentsByPatient(req, res) {
    let patientId = req.params.patientId;

    await patientService.getAppointmentsByPatient(res, patientId);
}

//=================================
//Citas de un paciente por status
//=================================
async function getAppointmentsByPatientByStatus(req, res) {
    let patientId = req.params.patientId;
    let statusAppointment = req.params.status;

    await patientService.getAppointmentsByPatientByStatus(res, patientId, statusAppointment);
}

//=================================
//Todas las citas
//=================================
async function getAppointments(req, res) {
    await models.Appointment.findAll({
            include: [{
                    model: models.PrePatient,
                    required: false
                }, {
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
                    message: "No hay citas"
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: "Citas",
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

//=================================
//Una cita por id
//=================================
async function getAppointmentById(req, res) {
    let id = req.params.id;

    await models.Appointment.findOne({
            where: { id },
            include: [{
                    model: models.PrePatient,
                    required: false
                }, {
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
        .then(appointment => {
            if (appointment === null) {
                res.status(200).json({
                    ok: true,
                    message: "No hay cita con el id requerido"
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: "Cita",
                    appointment
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Cita no encontrada, ha ocurrido un error',
                error: err.message
            });
        });;
}

//=================================
//Obtener citas por status
//=================================
async function getAppointmentsByStatus(req, res) {
    let statusAppointment = req.params.status;

    await models.Appointment.findAll({
            where: { statusAppointment },
            include: [{
                    model: models.PrePatient,
                    required: false
                }, {
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
                    message: "No hay citas con el status requerido"
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: "Citas",
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

async function getAppointmentHistoryById(req, res) {
    let id = req.params.id;

    await models.AppointmentHistory.findOne({
            where: { id },
            include: [{
                    model: models.RiskFactor,
                    required: false
                },
                {
                    model: models.Illness,
                    required: false
                }
            ],
        })
        .then(history => {
            if (history === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay historial de cita con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    history
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

module.exports = {
    availableTimetables,
    saveAppointment,
    saveAppointmentHistory,
    cancelAppointment,
    getAppointmentsByPerson,
    getAppointmentsByPersonByStatus,
    getAppointmentsByPersonByType,
    getAppointmentsByPatient,
    getAppointmentsByPatientByStatus,
    getAppointments,
    getAppointmentById,
    getAppointmentsByStatus,
    getAppointmentHistoryById
}