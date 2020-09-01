// ====================================================
//      Controller Donative
//      By ARYA Team ©
// ====================================================

const DonationType = require('../models').DonationType;
const Donative = require('../models').Donative;
const Donation = require('../models').Donation;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los donativos
//======================================
async function getDonatives(req, res) {
    await Donative.findAll({
            include: [{
                    model: DonationType,
                    required: false,
                },
                {
                    model: Donation,
                    required: false,
                }
            ]
        })
        .then(donatives => {
            if (donatives.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donativos registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    donatives
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

//==========================================
//Mostrar todos los donativos por estatus
//==========================================
async function getDonativesByStatus(req, res) {
    let status = req.params.status;
    await Donative.findAll({
            where: { status },
            include: [{
                model: DonationType,
                required: false,
            }, {
                model: Donation,
                required: false,
            }]
        })
        .then(donatives => {
            if (donatives.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay donativos registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    donatives
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
//Mostrar donativo por id
//=================================
async function getDonativeById(req, res) {
    let id = req.params.id;
    await Donative.findOne({
            where: { id },
            include: [{
                    model: DonationType,
                    required: false,
                },
                {
                    model: Donation,
                    required: false,
                }
            ]
        })
        .then(donative => {
            if (donative === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donativo con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    donative
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
//Crear donativo
//==============================
async function saveDonative(req, res) {
    let body = req.body;

    let donative = {
        name: body.name,
        description: body.description,
        status: body.status || true,
        typeId: body.typeId
    }

    await Donative.create(donative)
        .then(async donat => {
            saveBitacora('Donative', donat.id, donat.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Donativo creado con éxito',
                donat
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Donativo no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar donativo
//==============================
async function updateDonative(req, res) {
    let id = req.params.id;

    await Donative.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Donative', id, 'update donative', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Donativo actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el donativo con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el donativo con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar donativo por id
//==================================
async function deleteDonative(req, res) {
    let id = req.params.id;

    await Donative.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Donative', id, 'donative delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Donativo eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el donativo con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el donativo con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar donativo
//=====================================
async function statusDonative(req, res) {
    let id = req.params.id;

    let donative;
    await Donative.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donativo con el id requerido',
                });
            } else {
                donative = result;
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

    if (donative.status === true)
        change = false;

    await Donative.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Donative', donative.id, donative.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Donativo actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el donativo con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar donaciones de un donativo
//==========================================
async function getDonationsByDonative(req, res) {
    let donativeId = req.params.donativeId;
    await Donation.findAll({ where: { donativeId } })
        .then(donations => {
            if (donations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donaciones del donativo con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    donations
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
    getDonatives,
    getDonativesByStatus,
    getDonativeById,
    saveDonative,
    updateDonative,
    deleteDonative,
    statusDonative,
    getDonationsByDonative
}