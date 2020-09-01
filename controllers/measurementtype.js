// ====================================================
//      Controller MeasurementType
//      By ARYA Team ©
// ====================================================

const MeasurementType = require('../models').MeasurementType;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de medición
//======================================
async function getMeasurementTypes(req, res) {
    await MeasurementType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de medición registrado',
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
//Mostrar tipo de medición por id
//=================================
async function getMeasurementTypeById(req, res) {
    let id = req.params.id;
    await MeasurementType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de medición con el id requerido',
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

//===============================================
//Mostrar todos los tipos de medición por estatus
//===============================================
async function getMeasurementTypesByStatus(req, res) {
    let status = req.params.status;
    await MeasurementType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de medición registrados con el estatus ${status}`,
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
//Crear tipo de medición
//==============================
async function saveMeasurementType(req, res) {
    let body = req.body;
    let upper = Number(req.body.upperRank);
    let lower = Number(req.body.lowerRank);

    if (upper <= lower) {
        return res.status(400).json({
            ok: false,
            message: 'Nivel inferior no puede ser mayor o igual a nivel superior'
        });
    }

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true,
        lowerRank: lower,
        upperRank: upper,
        dangerLevel: body.dangerLevel,
        upperMessage: body.upperMessage,
        downMessage: body.downMessage,
        inRangeMessage: body.inRangeMessage
    }

    await MeasurementType.create(type)
        .then(async type => {
            saveBitacora('MeasurementType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de medición creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de medición no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de medición
//==============================
async function updateMeasurementType(req, res) {
    let id = req.params.id;
    let upper = Number(req.body.upperRank);
    let lower = Number(req.body.lowerRank);

    if (upper <= lower) {
        return res.status(400).json({
            ok: false,
            message: 'Nivel inferior no puede ser mayor o igual a nivel superior'
        });
    }

    await MeasurementType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('MeasurementType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de medición actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de medición con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de medición con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de medición por id
//==================================
async function deleteMeasurementType(req, res) {
    let id = req.params.id;

    await MeasurementType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('MeasurementType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de medición eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de medición con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de medición con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de medición
//=====================================
async function statusMeasurementType(req, res) {
    let id = req.params.id;

    let typeMeasurement;
    await MeasurementType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de medición con el id requerido',
                });
            } else {
                typeMeasurement = type;
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

    if (typeMeasurement.status === true)
        change = false;

    await MeasurementType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('MeasurementType', typeMeasurement.id, typeMeasurement.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de medición actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de medición con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getMeasurementTypes,
    getMeasurementTypeById,
    getMeasurementTypesByStatus,
    saveMeasurementType,
    updateMeasurementType,
    deleteMeasurementType,
    statusMeasurementType
}