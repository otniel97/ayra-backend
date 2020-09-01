// ====================================================
//      Controller Patient
//      By ARYA Team ©
// ====================================================

const Patient = require('../models').Patient;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los pacientes
//======================================
async function getPatients(req, res) {
    await Patient.findAll({
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.MedicalRecord,
                    include: [models.EconomicStatus, models.DiabetesType],
                    required: false
                },
                {
                    model: models.LegalGuardian,
                    required: false
                }
            ]
        })
        .then(patients => {
            if (patients.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pacientes registrados',
                });
            } else {
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

//==============================================
//Mostrar todos los pacientes por estatus
//==============================================
async function getPatientsByStatus(req, res) {
    let status = req.params.status;
    await Patient.findAll({
            where: { status },
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.MedicalRecord,
                    include: [models.EconomicStatus, models.DiabetesType],
                    required: false
                },
                {
                    model: models.LegalGuardian,
                    required: false
                }
            ]
        })
        .then(patients => {
            if (patients.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay pacientes registrados con el estatus ${status}`,
                });
            } else {
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

//=================================
//Mostrar paciente por id
//=================================
async function getPatientById(req, res) {
    let id = req.params.id;
    await Patient.findOne({
            where: { id },
            include: [{
                    model: models.User,
                    required: false
                },
                {
                    model: models.LegalGuardian,
                    required: false
                },
                {
                    model: models.MedicalRecord,
                    include: [models.EconomicStatus, models.DiabetesType],
                    required: false
                }
            ]
        })
        .then(patient => {
            if (patient === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay paciente con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    patient
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
//Actualizar paciente
//==============================
async function updatePatient(req, res) {
    let id = req.params.id;

    await Patient.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Patient', id, 'update patient', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Paciente actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe paciente con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el paciente con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar paciente
//=====================================
async function statusPatient(req, res) {
    let id = req.params.id;

    await Patient.findOne({ where: { id } })
        .then(async patient => {
            if (patient === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay paciente con el id requerido',
                });
            } else {
                const check = patient.status;
                if (check === false)
                    patient.status = true;
                else
                    patient.status = false;

                await patient.save();

                saveBitacora('Patient', patient.id, patient.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Paciente actualizado con éxito',
                    patient
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
//Crear Ficha médica
//==============================
async function saveMedicalRecord(req, res) {
    let body = req.body;
    let id = req.params.patientId;

    let record = {
        bloodType: body.bloodType,
        personalBackground: body.personalBackground,
        familyBackground: body.familyBackground,
        status: body.status || true,
        amputated: body.amputated || false,
        patientId: id,
        diabetesId: body.diabetesId
    }

    await Patient.update({ transaction: 2 }, { where: { id: id } })
        .then(async result => {
            if (result == 1) {
                await models.MedicalRecord.create(record)
                    .then(async record => {
                        saveBitacora('MedicalRecord', record.id, 'create record', 'create', req.user.id);
                        res.status(200).json({
                            ok: true,
                            message: 'Ficha médica creada con éxito',
                            record
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            ok: false,
                            message: 'Ficha médica no creada, ha ocurrido un error',
                            error: err.parent.detail
                        });
                    });;
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el paciente con id = ${patientId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Ficha médica no creada, ha ocurrido un error',
                error: err.message
            });
        });;
}

//=================================
//Mostrar ficha médica de paciente
//=================================
async function getMedicalRecordByPatientId(req, res) {
    let patientId = req.params.patientId;
    await models.MedicalRecord.findOne({
            where: { patientId },
            include: [{
                    model: Patient,
                    include: [models.User],
                    required: false
                },
                {
                    model: models.EconomicStatus,
                    required: false
                },
                {
                    model: models.AppointmentHistory,
                    include: [models.RiskFactor, models.Illness],
                    required: false
                },
                {
                    model: models.DiabetesType,
                    required: false
                }
            ]
        })
        .then(record => {
            if (record === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay ficha médica con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    record
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
//Actualizar ficha médica
//==============================
async function updateMedicalRecord(req, res) {
    let patientId = req.params.patientId;
    let record = await models.MedicalRecord.findOne({ where: { patientId } })

    await models.MedicalRecord.update(req.body, { where: { patientId } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('MedicalRecord', record.id, 'update record', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Ficha médica actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe ficha médica para paciente con id = ${patientId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la ficha médica con id = ${record.id}.`,
                error: err.parent.detail
            });
        });
}

//==============================
//Crear resumen socioeconómico
//==============================
async function saveEconomicStatus(req, res) {
    let body = req.body;
    let id = req.params.medicalRecordId;

    let economic = {
        familyHead: body.familyHead,
        housing: body.housing,
        insurance: body.insurance,
        monthlySalary: body.monthlySalary,
        familyMembers: body.familyMembers,
        other: body.other,
        status: body.status || true,
        medicalRecordId: id
    }

    record = await models.MedicalRecord.findOne({ where: { id: id }, include: [models.Patient] })
        .then(async record => {
            if (record === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay ficha médica con el id requerido',
                });
            } else {
                await Patient.update({ transaction: 3 }, { where: { id: record.patientId } })
                await models.EconomicStatus.create(economic)
                    .then(async record => {
                        saveBitacora('EconomicStatus', record.id, 'create economic', 'create', req.user.id);
                        res.status(200).json({
                            ok: true,
                            message: 'Resumen económico creado con éxito',
                            record
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            ok: false,
                            message: 'Resumen económico no creado, ha ocurrido un error',
                            error: err.parent.detail
                        });
                    });;
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
//Mostrar resumen económico
//=================================
async function getEconomicStatusByPatientId(req, res) {
    let medicalRecordId = req.params.medicalRecordId;
    await models.EconomicStatus.findOne({
            where: { medicalRecordId },
            include: [{
                model: models.MedicalRecord,
                include: [models.Patient],
                required: false
            }]
        })
        .then(record => {
            if (record === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay resumen socioeconómico con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    record
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
//Actualizar resumen económico
//==============================
async function updateEconomicStatus(req, res) {
    let medicalRecordId = req.params.medicalRecordId;
    economic = await models.EconomicStatus.findOne({ where: { medicalRecordId } })

    await models.EconomicStatus.update(req.body, { where: { medicalRecordId } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('EconomicStatus', economic.id, 'update economic', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Resumen socioeconómico actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe resumen socioeconómico con id = ${medicalRecordId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el resumen socioeconómico con id = ${medicalRecordId}.`,
                error: err.parent.detail
            });
        });
}

module.exports = {
    getPatients,
    getPatientsByStatus,
    getPatientById,
    updatePatient,
    statusPatient,
    saveMedicalRecord,
    getMedicalRecordByPatientId,
    updateMedicalRecord,
    saveEconomicStatus,
    getEconomicStatusByPatientId,
    updateEconomicStatus
}