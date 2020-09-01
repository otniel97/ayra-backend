// ====================================================
//      Controller GlucoseMeasurement
//      By ARYA Team ©
// ====================================================

const GlucoseMeasurement = require('../models').GlucoseMeasurement;
const MeasurementType = require('../models').MeasurementType;
const Patient = require('../models').Patient;
const Op = require('../models').Sequelize.Op;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las mediciones del paciente logeado
//======================================
async function getGlucoseMeasurements(req, res) {
    let user = req.user;

    //buscar paciente asociado al usuario logeado
    let patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (patient) {
        await GlucoseMeasurement.findAll({
                where: { patientId: patient.id },
                include: MeasurementType,
                order: [
                    ['resultDate', 'DESC']
                ]
            })
            .then(glucoseMeasurements => {
                if (glucoseMeasurements.length === 0) {
                    return res.status(200).json({
                        ok: false,
                        message: 'El paciente no cuenta con ninguna medicion asociada',
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: 'Mediciones de glucosa asociadas al paciente.',
                        glucoseMeasurements
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
    } else
        return res.status(200).json({
            ok: false,
            message: 'El usuario no cuenta con un paciente asociado'
        })
}

//=================================
//Mostrar medicion por id
//=================================
async function getGlucoseMeasurementById(req, res) {
    let id = req.params.id;

    await GlucoseMeasurement.findOne({
            where: { id },
            include: MeasurementType,
            order: [
                ['resultDate', 'DESC']
            ]
        })
        .then(glucoseMeasurement => {
            if (glucoseMeasurement === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe una medición con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'Medida de glucosa',
                    glucoseMeasurement
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
//Crear medicion
//==============================
async function saveGlucoseMeasurement(req, res) {
    let body = req.body;
    let patient = await Patient.findOne({ where: { userId: req.user.id } });

    let glucoseMeasurement = {
        measurementTypeId: body.measurementTypeId,
        result: body.result,
        resultDate: body.resultDate,
        status: body.status || true,
        patientId: patient.id
    }

    today = new Date().toISOString().slice(0, 10);
    if (body.resultDate > today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser menor o igual que la fecha actual ${today}`
        });
    else {
        await GlucoseMeasurement.create(glucoseMeasurement)
            .then(async glucoseMeasurement => {
                saveBitacora('GlucoseMeasurement', glucoseMeasurement.id, glucoseMeasurement.result, 'create', req.user.id);

                //buscar nivel de medicion
                let measurementType = await MeasurementType.findOne({ where: { id: glucoseMeasurement.measurementTypeId } });
                var levelMessage;
                var warning = false;

                //comparar los niveles para ver que mensaje enviar
                if (glucoseMeasurement.result > measurementType.upperRank)
                    levelMessage = measurementType.upperMessage;
                else if (glucoseMeasurement.result < measurementType.lowerRank)
                    levelMessage = measurementType.downMessage;
                else {
                    levelMessage = measurementType.inRangeMessage;
                    warning = true;
                }

                //enviar respuesta de medicion exitosa en conjunto con el mensaje referente al nivel que corresponda
                return res.status(200).json({
                    ok: true,
                    message: 'Medicion creada con éxito',
                    rangeMessage: levelMessage,
                    glucoseMeasurement,
                    alert: warning
                });
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Medicion no creada, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//==============================
//Editar medicion
//==============================
async function updateGlucoseMeasurement(req, res) {

    let id = req.params.id;
    let body = req.body;

    today = new Date().toISOString().slice(0, 10);
    if (body.resultDate > today)
        res.status(400).json({
            ok: false,
            message: `La fecha debe ser menor o igual que la fecha actual ${today}`
        });
    else {
        let patient = await Patient.findOne({ where: { userId: req.user.id } });

        await GlucoseMeasurement.findOne({
                where: {
                    id: id,
                    patientId: patient.id
                },
                include: MeasurementType
            })
            .then(async glucoseMeasurement => {
                glucoseMeasurement.result = body.result;
                glucoseMeasurement.measurementTypeId = body.measurementTypeId;
                glucoseMeasurement.resultDate = body.resultDate;

                await glucoseMeasurement.save();
                saveBitacora('GlucoseMeasurement', glucoseMeasurement.id, glucoseMeasurement.result, 'update', req.user.id);

                //buscar nivel de medicion
                let measurementType = await MeasurementType.findOne({ where: { id: glucoseMeasurement.measurementTypeId } });
                var levelMessage;
                var warning = false;

                //comparar los niveles para ver que mensaje enviar
                if (glucoseMeasurement.result > measurementType.upperRank)
                    levelMessage = measurementType.upperMessage;
                else if (glucoseMeasurement.result < measurementType.lowerRank)
                    levelMessage = measurementType.downMessage;
                else {
                    levelMessage = measurementType.inRangeMessage;
                    warning = true
                }

                //enviar respuesta de actualizacion
                return res.status(200).json({
                    ok: true,
                    message: 'Medicion actualizada con éxito.',
                    rangeMessage: levelMessage,
                    glucoseMeasurement,
                    alert: warning
                });

            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Medicion no creada, ha ocurrido un error',
                    error: err.message
                });
            });
    }
}

//======================================
//Mostrar todas las mediciones de un paciente
//======================================
async function getGlucoseMeasurementsOfPatient(req, res) {
    let id = req.params.id;
    let patient = await Patient.findOne({ where: { id: id } });
    if (patient) {
        await GlucoseMeasurement.findAll({
                where: { patientId: patient.id },
                include: MeasurementType,
                order: [
                    ['resultDate', 'DESC']
                ]
            })
            .then(glucoseMeasurements => {
                if (glucoseMeasurements.length === 0) {
                    return res.status(200).json({
                        ok: false,
                        message: 'El paciente no cuenta con ninguna medicion asociada',
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: 'Mediciones de glucosa asociadas al paciente.',
                        glucoseMeasurements
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
    } else
        return res.status(200).json({
            ok: false,
            message: 'El usuario no cuenta con un paciente asociado'
        })
}

//======================================
//Mostrar todas las mediciones del día
//======================================
async function getGlucoseMeasurementsToday(req, res) {
    let patient = await Patient.findOne({ where: { userId: req.user.id } });
    today = new Date().toISOString();
    if (patient) {
        await GlucoseMeasurement.findAll({
                where: { patientId: patient.id, resultDate: today },
                include: MeasurementType,
                order: [
                    ['resultDate', 'DESC']
                ]
            })
            .then(glucoseMeasurements => {
                if (glucoseMeasurements.length == 0) {
                    return res.status(200).json({
                        ok: false,
                        message: 'No has registrado tu nivel de glucosa hoy.',
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: 'Mediciones de glucosa asociadas al paciente.',
                        glucoseMeasurements
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
    } else
        return res.status(200).json({
            ok: false,
            message: 'El usuario no cuenta con un paciente asociado'
        })
}

//=====================================================
//Mostrar todas las mediciones de un paciente en fechas
//=====================================================
async function getGlucoseMeasurementsOfPatientByDates(req, res) {
    let id = req.params.id;
    let firstDate = req.body.firstDate;
    let secondDate = req.body.secondDate;
    let patient = await Patient.findOne({ where: { id } });

    if (firstDate > secondDate)
        return res.status(400).json({
            ok: true,
            message: `Error, fecha inicial debe ser menor o igual a fecha final`,
            firstDate
        });
    if (patient) {
        await GlucoseMeasurement.findAll({
                where: {
                    patientId: patient.id,
                    [Op.or]: [{
                        resultDate: {
                            [Op.gt]: firstDate,
                            [Op.lt]: secondDate
                        }
                    }]
                },
                include: MeasurementType,
                order: [
                    ['resultDate', 'DESC']
                ]
            })
            .then(glucoseMeasurements => {
                if (glucoseMeasurements.length === 0) {
                    return res.status(200).json({
                        ok: false,
                        message: 'El paciente no cuenta con ninguna medicion asociada en las fechas solicitadas',
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        message: 'Mediciones de glucosa asociadas al paciente.',
                        glucoseMeasurements
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
    } else
        return res.status(200).json({
            ok: false,
            message: `No existe el paciente con id ${id}`
        })
}

module.exports = {
    getGlucoseMeasurements,
    getGlucoseMeasurementById,
    saveGlucoseMeasurement,
    getGlucoseMeasurementsOfPatient,
    updateGlucoseMeasurement,
    getGlucoseMeasurementsToday,
    getGlucoseMeasurementsOfPatientByDates
}