// ====================================================
//      Controller DiabetesType
//      By ARYA Team ©
// ====================================================

const DiabetesType = require('../models').DiabetesType;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de diabetes
//======================================
async function getDiabetesTypes(req, res) {
    await DiabetesType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de diabetes registrado',
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
//Mostrar tipo de diabetes por id
//=================================
async function getDiabetesTypeById(req, res) {
    let id = req.params.id;
    await DiabetesType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de diabetes con el id requerido',
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

//================================================
//Mostrar todas los tipos de diabetes por estatus
//================================================
async function getDiabetesTypesByStatus(req, res) {
    let status = req.params.status;
    await DiabetesType.findAll({
            where: { status }
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de diabetes registrados con el estatus ${status}`,
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
//Crear tipo de diabetes
//==============================
async function saveDiabetesType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await DiabetesType.create(type)
        .then(async type => {
            saveBitacora('DiabetesType', type.id, type.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de diabetes creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de diabetes no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de diabetes
//==============================
async function updateDiabetesType(req, res) {
    let id = req.params.id;

    await DiabetesType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('DiabetesType', id, 'udpate type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de diabetes actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de diabetes con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de diabetes con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de diabetes por id
//==================================
async function deleteDiabetesType(req, res) {
    let id = req.params.id;

    await DiabetesType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('DiabetesType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de diabetes eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de diabetes con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de diabetes con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de diabetes
//=====================================
async function statusDiabetesType(req, res) {
    let id = req.params.id;

    await DiabetesType.findOne({ where: { id } })
        .then(async type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de diabetes con el id requerido',
                });
            } else {
                const check = type.status;
                if (check === false)
                    type.status = true;
                else
                    type.status = false;

                await type.save();

                saveBitacora('DiabetesType', type.id, type.description, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Tipo de diabetes actualizado con éxito',
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

//=========================================
//Mostrar pacientes de un tipo de diabetes
//=========================================
async function getPatientsByDiabetesType(req, res) {
    let diabetesId = req.params.diabetesId;

    await models.MedicalRecord.findAll({
            where: { diabetesId },
            include: [{
                model: models.Patient,
                required: false,
            }]
        })
        .then(medicalRecords => {
            if (medicalRecords.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pacientes con este tipo de diabetes',
                });
            } else {
                let records = medicalRecords;
                var patients = [];
                records.forEach((item) => {
                    var patient = {
                        name: item.Patient.name,
                        surname: item.Patient.surname,
                        gender: item.Patient.gender,
                        cedula: item.Patient.cedula,
                        address: item.Patient.address,
                        phoneNumber: item.Patient.phoneNumber
                    }
                    patients.push(patient);
                });
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

module.exports = {
    getDiabetesTypes,
    getDiabetesTypeById,
    getDiabetesTypesByStatus,
    saveDiabetesType,
    updateDiabetesType,
    deleteDiabetesType,
    statusDiabetesType,
    getPatientsByDiabetesType
}