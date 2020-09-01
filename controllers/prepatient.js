// ====================================================
//      Controller PrePatient
//      By ARYA Team ©
// ====================================================

const PrePatient = require('../models').PrePatient;
const notification = require('../services/notification');
const serviceMail = require('../services/email');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los pre pacientes
//======================================
async function getPrePatients(req, res) {
    await PrePatient.findAll()
        .then(patients => {
            if (patients.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pre pacientes registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    patients
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

//==============================================
//Mostrar todos los pre pacientes por status
//==============================================
async function getPrePatientsByStatus(req, res) {
    let status = req.params.status;
    await PrePatient.findAll({ where: { status } })
        .then(patients => {
            if (patients.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay pre pacientes registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    patients
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
//Mostrar pre paciente por id
//=================================
async function getPrePatientById(req, res) {
    let id = req.params.id;
    await PrePatient.findOne({ where: { id } })
        .then(patient => {
            if (patient === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un pre paciente con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    patient
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

//==============================
//Crear pre paciente
//==============================
async function savePrePatient(req, res) {
    let body = req.body;

    let patient = {
        name: body.name,
        surname: body.surname,
        email: body.email,
        cedula: body.cedula,
        gender: body.gender,
        birthdate: body.birthdate,
        phoneNumber: body.phoneNumber,
        description: body.description,
        status: 'pending',
    }

    today = new Date().toISOString().slice(0, 10);
    if (body.birthdate >= today)
        return res.status(400).json({
            ok: false,
            message: `La fecha de nacimiento debe ser menor que la fecha actual ${today}`
        });
    else {
        await PrePatient.create(patient)
            .then(async patient => {
                await notification.newPrepatient();
                var context = {
                    name: patient.name,
                    email: patient.email,
                    description: 'Su solicitud ha sido recibida, en breve nos pondremos en contacto con usted con más información sobre la misma.'
                }
                if (serviceMail.sendMail('Solicitud recibida', patient.email, 'prePatientMessage', context))
                    return res.status(200).json({
                        ok: true,
                        message: 'Pre paciente creado con éxito',
                        patient
                    });
                else
                    return res.status(200).json({
                        ok: false,
                        message: 'Ha ocurrido un error'
                    });
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Pre paciente no creado, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//=====================================
//Actualizar status
//=====================================
async function statusPrePatient(req, res) {
    let id = req.params.id;
    let status = req.params.status;

    await PrePatient.findOne({ where: { id } })
        .then(async pre => {
            if (pre === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pre paciente con el id requerido',
                });
            } else {
                pre.status = status;
                await pre.save();

                //switch
                switch (status) {
                    case ('canceled'):
                        var context = {
                            name: pre.name,
                            email: pre.email,
                            description: 'Su solicitud para ser atendido como paciente ha sido rechazada. Lamentamos las molestias causadas.'
                        }
                        serviceMail.sendMail('Solicitud cancelada', pre.email, 'prePatientMessage', context);
                        break;
                    case ('rejected'):
                        var context = {
                            name: pre.name,
                            email: pre.email,
                            description: 'Usted ha sido rechazado y no podrá pertenecer a la organización como un paciente. Lamentamos las molestias causadas.'
                        }
                        serviceMail.sendMail('Paciente rechazado', pre.email, 'prePatientMessage', context);
                        break;
                }

                saveBitacora('Prepatient', pre.id, pre.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Pre paciente actualizado con éxito',
                    pre
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
    getPrePatients,
    getPrePatientsByStatus,
    getPrePatientById,
    savePrePatient,
    statusPrePatient
}