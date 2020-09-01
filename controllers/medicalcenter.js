// ====================================================
//      Controller MedicalCenter
//      By ARYA Team ©
// ====================================================

const MedicalCenter = require('../models').MedicalCenter;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los centros médicos
//======================================
async function getMedicalCenters(req, res) {
    await MedicalCenter.findAll()
        .then(centers => {
            if (centers.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay centros médicos registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    centers
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
//Mostrar todos los centros médicos por estatus
//==============================================
async function getMedicalCentersByStatus(req, res) {
    let status = req.params.status;
    await MedicalCenter.findAll({ where: { status } })
        .then(centers => {
            if (centers.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay centros médicos registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    centers
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
//Mostrar centro médico por id
//=================================
async function getMedicalCenterById(req, res) {
    let id = req.params.id;
    await MedicalCenter.findOne({ where: { id } })
        .then(center => {
            if (center === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay centro médico con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    center
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
//Crear centro médico
//==============================
async function saveMedicalCenter(req, res) {
    let body = req.body;

    let center = {
        name: body.name,
        description: body.description,
        address: body.address,
        addressUrl: body.addressUrl,
        phoneNumber: body.phoneNumber,
        status: body.status || true,
        webId: body.webId
    }

    await MedicalCenter.create(center)
        .then(async centerMedical => {
            saveBitacora('MedicalCenter', center.id, center.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Centro médico creada con éxito',
                centerMedical
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Centro médico no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar centro médico
//==============================
async function updateMedicalCenter(req, res) {
    let id = req.params.id;

    await MedicalCenter.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('MedicalCenter', id, 'update medicalCenter', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Centro médico actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el centro médico con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el centro médico con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar centro médico por id
//==================================
async function deleteMedicalCenter(req, res) {
    let id = req.params.id;

    await MedicalCenter.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('MedicalCenter', id, 'delete medicalCenter', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Centro médico eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el centro médico con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el centro médico con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar centro médico
//=====================================
async function statusMedicalCenter(req, res) {
    let id = req.params.id;

    let center;
    await MedicalCenter.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay centro médico con el id requerido',
                });
            } else {
                center = result;
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

    if (center.status === true)
        change = false;

    await MedicalCenter.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('MedicalCenter', center.id, center.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Centro médico actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el centro médico con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getMedicalCenters,
    getMedicalCentersByStatus,
    getMedicalCenterById,
    saveMedicalCenter,
    updateMedicalCenter,
    deleteMedicalCenter,
    statusMedicalCenter,
}