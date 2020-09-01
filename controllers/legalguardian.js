// ====================================================
//      Controller Role
//      By ARYA Team ©
// ====================================================

const LegalGuardian = require('../models').LegalGuardian;
const Patient = require('../models').Patient;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los representantes
//======================================
async function getLegalGuardians(req, res) {
    await LegalGuardian.findAll({
            include: Patient
        })
        .then(legalGuardians => {
            if (legalGuardians.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay representantes registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    legalGuardians
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
//Mostrar todos los representantes por status
//==============================================
async function getLegalGuardiansByStatus(req, res) {
    let status = req.params.status;
    await LegalGuardian.findAll({
            where: { status },
            include: Patient
        })
        .then(legalGuardians => {
            if (legalGuardians.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay representantes registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    legalGuardians
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
//Mostrar representante por id
//=================================
async function getLegalGuardianById(req, res) {
    let id = req.params.id;
    await LegalGuardian.findOne({
            where: { id },
            include: Patient
        })
        .then(legalGuardian => {
            if (legalGuardian === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un representante con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    legalGuardian
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
//Crear representante
//==============================
async function saveLegalGuardian(req, res) {
    let body = req.body;

    let newLegalGuardian = {
        name: body.name,
        surname: body.surname,
        status: body.status || true,
        gender: body.gender,
        birthdate: body.birthdate,
        phoneNumber: body.phoneNumber,
        relationship: body.relationship,
        address: body.address,
        patientId: body.patientId
    }

    today = new Date().toISOString().slice(0, 10);
    if (body.birthdate >= today)
        res.status(400).json({
            ok: false,
            message: `La fecha de nacimiento debe ser menor que la fecha actual ${today}`
        });
    else {
        let patient = await Patient.findOne({ where: { id: body.patientId } });

        if (patient === null)
            return res.status(200).json({
                ok: false,
                message: 'El paciente no existe.'
            });
        else {
            await LegalGuardian.create(newLegalGuardian)
                .then(async legalGuardian => {
                    saveBitacora('LegalGuardian', legalGuardian.id, legalGuardian.name, 'create', req.user.id);
                    res.status(200).json({
                        ok: true,
                        message: 'Representante creado con éxito',
                        legalGuardian
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        ok: false,
                        message: 'Representante no creado, ha ocurrido un error',
                        error: err.parent.detail
                    });
                });;
        }
    }
}

//==============================
//Actualizar representante
//==============================
async function updateLegalGuardian(req, res) {
    let id = req.params.id;

    await LegalGuardian.update(req.body, {
            where: { id: id },
            include: Patient
        })
        .then(async savedLegalGuardian => {
            if (savedLegalGuardian == 1) {
                saveBitacora('LegalGuardian', id, 'update legalGuardian', 'update', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Representante actualizado con éxito',
                    savedLegalGuardian
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un representante con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el representante con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar representante por id
//==================================
async function deleteLegalGuardian(req, res) {
    let id = req.params.id;

    await LegalGuardian.destroy({ where: { id: id } })
        .then(async legalGuardian => {
            if (legalGuardian == 1) {
                saveBitacora('LegalGuardian', id, 'delete legalGuardian', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Representante eliminado con éxito',
                    legalGuardian
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un representante con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el representante con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar representante
//=====================================
async function statusLegalGuardian(req, res) {
    let id = req.params.id;

    await LegalGuardian.findOne({ where: { id } })
        .then(async legalGuardian => {
            if (legalGuardian === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay un representante con el id requerido.',
                });
            } else {
                const check = legalGuardian.status;
                if (check === false)
                    legalGuardian.status = true;
                else
                    legalGuardian.status = false;

                await legalGuardian.save();

                saveBitacora('LegalGuardian', legalGuardian.id, legalGuardian.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Representante actualizado con éxito.',
                    legalGuardian
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error.',
                error: err.message
            });
        });
}

module.exports = {
    getLegalGuardians,
    getLegalGuardiansByStatus,
    getLegalGuardianById,
    saveLegalGuardian,
    updateLegalGuardian,
    deleteLegalGuardian,
    statusLegalGuardian
}