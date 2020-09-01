// ====================================================
//      Controller Donation
//      By ARYA Team ©
// ====================================================

const Donation = require('../models').Donation;
const DonationType = require('../models').DonationType;
const Donative = require('../models').Donative;
const serviceMail = require('../services/email');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las donaciones
//======================================
async function getDonations(req, res) {
    await Donation.findAll({
            include: [{
                model: Donative,
                include: [DonationType],
                required: false,
            }]
        })
        .then(donations => {
            if (donations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donaciones registradas',
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==========================================
//Mostrar todas las donaciones por estatus
//==========================================
async function getDonationsByStatus(req, res) {
    let status = req.params.status;
    await Donation.findAll({
            where: { status },
            include: [{
                model: Donative,
                include: [DonationType],
                required: false,
            }]
        })
        .then(donations => {
            if (donations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay donaciones registradas con el estatus ${status}`,
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=================================
//Mostrar donacion por id
//=================================
async function getDonationById(req, res) {
    let id = req.params.id;
    await Donation.findOne({
            where: { id },
            include: [{
                model: Donative,
                include: [DonationType],
                required: false,
            }]
        })
        .then(donation => {
            if (donation === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donación con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    donation
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
//Crear donación
//==============================
async function saveDonation(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        description: body.description,
        status: body.status || true,
        donativeId: body.donativeId
    }

    await Donation.create(type)
        .then(async donation => {
            saveBitacora('Donation', donation.id, donation.description, 'create', req.user.id);
            var donative = await Donative.findOne({where: {id: donation.donativeId}})
            var context = {
                name: donation.name,
                donative: donative.name
            }

            if(serviceMail.sendMail('Donación recibida', donation.email, 'donation', context))
                return res.status(200).json({
                    ok: true,
                    message: 'Donación creada con éxito',
                    donation
                });
            else
                return res.status(200).json({
                    ok: false,
                    message: 'No se ha podido enviar correo de confirmacion'
                })
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Donación no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar donación
//==============================
async function updateDonation(req, res) {
    let id = req.params.id;

    await Donation.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Donation', id, 'donation update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Donación actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la donación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la donación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar donación por id
//==================================
async function deleteDonation(req, res) {
    let id = req.params.id;

    await Donation.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Donation', id, 'delete donation', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Donación eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la donación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la donación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar donación
//=====================================
async function statusDonation(req, res) {
    let id = req.params.id;

    let donation;
    await Donation.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donación con el id requerido',
                });
            } else {
                donation = result;
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

    if (donation.status === true)
        change = false;

    await Donation.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Donation', donation.id, donation.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Donación actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la de donación con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getDonations,
    getDonationsByStatus,
    getDonationById,
    saveDonation,
    updateDonation,
    deleteDonation,
    statusDonation,
}