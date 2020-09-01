// ====================================================
//      Controller Speciality
//      By ARYA Team ©
// ====================================================

const Speciality = require('../models').Speciality;
const PersonType = require('../models').PersonType;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las especialidades
//======================================
async function getSpecialities(req, res) {
    await Speciality.findAll({
            include: [{
                model: PersonType,
                required: false
            }]
        })
        .then(specialities => {
            if (specialities.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay especialidad registrada',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    specialities
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

//============================================
//Mostrar todas las especialidades por status
//============================================
async function getSpecialitiesByStatus(req, res) {
    let status = req.params.status;
    await Speciality.findAll({
            where: { status },
            include: [{
                model: PersonType,
                required: false
            }]
        })
        .then(specialities => {
            if (specialities.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay especialidad registrada con el status ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    specialities
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
//Mostrar especialidad por id
//=================================
async function getSpecialityById(req, res) {
    let id = req.params.id;
    await Speciality.findOne({
            where: { id },

            include: [{
                model: PersonType,
                required: false
            }]
        })
        .then(speciality => {
            if (speciality === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay especialidad con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    speciality
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
//Crear especialidad
//==============================
async function saveSpeciality(req, res) {
    let body = req.body;

    let speciality = {
        name: body.name,
        description: body.description,
        personTypeId: body.personTypeId,
        status: body.status || true
    }

    await Speciality.create(speciality)
        .then(async result => {
            saveBitacora('Specialty', result.id, result.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Especialidad creada con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Especialidad no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar especialidad
//==============================
async function updateSpeciality(req, res) {
    let id = req.params.id;

    await Speciality.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Specialty', id, 'specialty udpate', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Especialidad actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la especialidad con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la especialidad con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar especialidad por id
//==================================
async function deleteSpeciality(req, res) {
    let id = req.params.id;

    await Speciality.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Specialty', id, 'delete specialty', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Especialidad eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la especialidad con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la especialidad con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar especialidad
//=====================================
async function statusSpeciality(req, res) {
    let id = req.params.id;

    let speciality;
    await Speciality.findOne({ where: { id } })
        .then(spe => {
            if (spe === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay especialidad con el id requerido',
                });
            } else {
                speciality = spe;
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

    if (speciality.status === true)
        change = false;

    await Speciality.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Specialty', speciality.id, speciality.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Especialidad actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la especialidad con id = ${id}.`,
                error: err.message
            });
        });
}

async function getSpecialitiesByPersonId(req, res) {
    let personTypeId = req.params.personTypeId;

    await Speciality.findAll({
            where: { personTypeId },
            include: [{
                model: PersonType,
                required: false
            }]
        })
        .then(specialities => {
            if (specialities.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay especialidades para el tipo de persona seleccionado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    specialities
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

module.exports = {
    getSpecialities,
    getSpecialitiesByStatus,
    getSpecialityById,
    saveSpeciality,
    updateSpeciality,
    deleteSpeciality,
    statusSpeciality,
    getSpecialitiesByPersonId
}