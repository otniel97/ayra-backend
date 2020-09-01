// ====================================================
//      Controller Pharmacy
//      By ARYA Team ©
// ====================================================

const Pharmacy = require('../models').Pharmacy;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las farmacias
//======================================
async function getPharmacies(req, res) {
    await Pharmacy.findAll()
        .then(farmacies => {
            if (farmacies.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay farmacias registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    farmacies
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
//Mostrar todas las farmacias por estatus
//==============================================
async function getPharmaciesByStatus(req, res) {
    let status = req.params.status;
    await Pharmacy.findAll({ where: { status } })
        .then(farmacies => {
            if (farmacies.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay farmacias registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    farmacies
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
//Mostrar farmacia por id
//=================================
async function getPharmacyById(req, res) {
    let id = req.params.id;
    await Pharmacy.findOne({ where: { id } })
        .then(pharmacy => {
            if (pharmacy === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay farmacia con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    pharmacy
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
//Crear farmacia
//==============================
async function savePharmacy(req, res) {
    let body = req.body;

    let pharmacy = {
        name: body.name,
        description: body.description,
        address: body.address,
        addressUrl: body.addressUrl,
        phoneNumber: body.phoneNumber,
        status: body.status || true,
        webId: body.webId
    }

    await Pharmacy.create(pharmacy)
        .then(async pharma => {
            saveBitacora('Pharmacy', pharma.id, pharma.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Farmacia creada con éxito',
                pharma
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Farmacia no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar farmacia
//==============================
async function updatePharmacy(req, res) {
    let id = req.params.id;

    await Pharmacy.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Pharmacy', id, 'update pharmacy', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Farmacia actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la farmacia con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la farmacia con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar farmacia por id
//==================================
async function deletePharmacy(req, res) {
    let id = req.params.id;

    await Pharmacy.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Pharmacy', id, 'delete pharmacy', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Farmacia eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la farmacia con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la farmacia con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar farmacia
//=====================================
async function statusPharmacy(req, res) {
    let id = req.params.id;

    let pharmacy;
    await Pharmacy.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay farmacia con el id requerido',
                });
            } else {
                pharmacy = result;
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

    if (pharmacy.status === true)
        change = false;

    await Pharmacy.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Pharmacy', pharmacy.id, pharmacy.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Farmacia actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la farmacia con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getPharmacies,
    getPharmaciesByStatus,
    getPharmacyById,
    savePharmacy,
    updatePharmacy,
    deletePharmacy,
    statusPharmacy,
}