// ====================================================
//      Controller Illness
//      By ARYA Team ©
// ====================================================

const Illness = require('../models').Illness;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las enfermedades
//======================================
async function getIllnesses(req, res) {
    await Illness.findAll()
        .then(illness => {
            if (illness.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay enfermedad registrada',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    illness
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
//Mostrar enfermedad por id
//=================================
async function getIllnessById(req, res) {
    let id = req.params.id;
    await Illness.findOne({ where: { id } })
        .then(illness => {
            if (illness === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay enfermedad con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    illness
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
//Mostrar enfermedades por estatus
//==============================================
async function getIllnessByStatus(req, res) {
    let status = req.params.status;
    await Illness.findAll({ where: { status } })
        .then(illnesses => {
            if (illnesses.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay enfermedades registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    illnesses
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
//Crear enfermedad
//==============================
async function saveIllness(req, res) {
    let body = req.body;

    let illness = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await Illness.create(illness)
        .then(async result => {
            saveBitacora('Illness', result.id, result.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Enfermedad creada con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Enfermedad no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar enfermedad
//==============================
async function updateIllness(req, res) {
    let id = req.params.id;

    await Illness.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('Illness', id, 'update illness', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Enfermedad actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la enfermedad con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la enfermedad con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar enfermedad por id
//==================================
async function deleteIllness(req, res) {
    let id = req.params.id;

    await Illness.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Illness', id, 'delete illness', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Enfermedad eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la enfermedad con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la enfermedad con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar enfermedad
//=====================================
async function statusIllness(req, res) {
    let id = req.params.id;

    let illness;
    await Illness.findOne({ where: { id } })
        .then(ill => {
            if (ill === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay enfermedad con el id requerido',
                });
            } else {
                illness = ill;
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

    if (illness.status === true)
        change = false;

    await Illness.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Illness', illness.id, illness.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Enfermedad actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la enfermedad con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getIllnesses,
    getIllnessById,
    getIllnessByStatus,
    saveIllness,
    updateIllness,
    deleteIllness,
    statusIllness,
}