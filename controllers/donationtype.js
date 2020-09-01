// ====================================================
//      Controller Donation Type
//      By ARYA Team ©
// ====================================================

const DonationType = require('../models').DonationType;
const Donative = require('../models').Donative;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de donaciones
//======================================
async function getDonationTypes(req, res) {
    await DonationType.findAll({
            include: [{
                model: models.Donative,
                as: 'donatives',
                required: false
            }],
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de donación registrado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    types
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
//Mostrar tipo de donacion por id
//=================================
async function getDonationTypeById(req, res) {
    let id = req.params.id;
    await DonationType.findOne({
            where: { id },
            include: [{
                model: models.Donative,
                as: 'donatives',
                required: false
            }],
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de donación con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    type
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

//=================================================
//Mostrar todos los tipos de donaciones por status
//=================================================
async function getDonationTypesByStatus(req, res) {
    let status = req.params.status
    await DonationType.findAll({
            where: { status },
            include: [{
                model: models.Donative,
                as: 'donatives',
                required: false
            }],
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipo de donación registrado con el status ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    types
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
//Crear tipo de donación
//==============================
async function saveDonationType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await DonationType.create(type)
        .then(async type => {
            saveBitacora('DonationType', type.id, type.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de donación creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de donación no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de donación
//==============================
async function updateDonationType(req, res) {
    let id = req.params.id;

    await DonationType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('DonationType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de donación actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de donación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de donación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de donación por id
//==================================
async function deleteDonationType(req, res) {
    let id = req.params.id;

    await DonationType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('DonationType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de donación eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de donación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de donación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de donación
//=====================================
async function statusDonationType(req, res) {
    let id = req.params.id;

    let typeDonation;
    await DonationType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de donación con el id requerido',
                });
            } else {
                typeDonation = type;
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

    if (typeDonation.status === true)
        change = false;

    await DonationType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('DonationType', typeDonation.id, typeDonation.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de donación actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de donación con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar donativos de un tipo de donacion
//==========================================
async function getDonationsByType(req, res) {
    let typeId = req.params.typeId;
    await Donative.findAll({ where: { typeId } })
        .then(donatives => {
            if (donatives.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay donativo del tipo de donación con el id requerido',
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
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}


module.exports = {
    getDonationTypes,
    getDonationTypeById,
    getDonationTypesByStatus,
    saveDonationType,
    updateDonationType,
    deleteDonationType,
    statusDonationType,
    getDonationsByType,
}