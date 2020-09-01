// ====================================================
//      Controller People
//      By ARYA Team ©
// ====================================================

const People = require('../models').People;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las personas
//======================================
async function getPeoples(req, res) {
    await People.findAll({
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.Speciality,
                    include: [models.PersonType],
                    required: false
                },
                {
                    model: models.Timetable,
                    required: false
                }
            ]
        })
        .then(peoples => {
            if (peoples.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay personas registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    peoples
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
//Mostrar todas las personas por estatus
//==============================================
async function getPeoplesByStatus(req, res) {
    let status = req.params.status;
    await People.findAll({
            where: { status },
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.Speciality,
                    required: false
                },
                {
                    model: models.Timetable,
                    required: false
                }
            ]
        })
        .then(peoples => {
            if (peoples.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay personas registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    peoples
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
//Mostrar persona por id
//=================================
async function getPeopleById(req, res) {
    let id = req.params.id;
    await People.findOne({
            where: { id },
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.Speciality,
                    required: false
                },
                {
                    model: models.Timetable,
                    required: false
                }
            ]
        })
        .then(people => {
            if (people === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay persona con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    people
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
//Actualizar persona
//==============================
async function updatePeople(req, res) {
    let id = req.params.id;

    await People.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('People', id, 'update people', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Persona actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la persona con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la persona con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar persona
//=====================================
async function statusPeople(req, res) {
    let id = req.params.id;

    let people;
    await People.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay persona con el id requerido',
                });
            } else {
                people = result;
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });

    if (people.status === true)
        people.status = false;
    else
        people.status = true;

    await people.save()
        .then(async data => {
            saveBitacora('People', people.id, people.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Persona actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la persona con id = ${id}.`,
                error: err.message
            });
        });
}

//=================================
//Mostrar personas por especialidad
//=================================
async function getPeoplesBySpecialityId(req, res) {
    let specialityId = req.params.id;
    await People.findAll({
            where: { specialityId },
            include: [{
                    model: models.Speciality,
                    required: false
                },
                {
                    model: models.Timetable,
                    required: false
                }
            ]
        })
        .then(peoples => {
            if (peoples.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay persona con la especialidad requerida',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    peoples
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

//=================================
//Mostrar pacientes de un doctor
//=================================
async function getPatientsByPeopleId(req, res) {
    let personId = req.params.personId;
    let result = [];

    await models.Appointment.findAll({
            where: { personId },
            include: [{
                model: models.Patient,
                required: false
            }]
        })
        .then(appointments => {
            if (appointments.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pacientes asociados',
                });
            } else {
                appointments.forEach((item) => {
                    result.push(item.Patient);
                });
                let set = new Set(result.map(JSON.stringify));
                let pat = Array.from(set).map(JSON.parse);
                let patients = [];
                pat.forEach((item) => {
                    if (item !== null)
                        patients.push(item);
                });
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    patients
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
    getPeoples,
    getPeoplesByStatus,
    getPeopleById,
    updatePeople,
    statusPeople,
    getPeoplesBySpecialityId,
    getPatientsByPeopleId
}