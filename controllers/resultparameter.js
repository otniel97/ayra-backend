// ====================================================
//      Controller ResultParameter
//      By ARYA Team ©
// ====================================================

const ResultParameter = require('../models').ResultParameter;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los parametros
//======================================
async function getResultParameters(req, res) {
    await ResultParameter.findAll()
        .then(parameters => {
            if (parameters.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay parametros registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    parameters
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
//Mostrar todos los parametros
//==============================================
async function getResultParametersByStatus(req, res) {
    let status = req.params.status;
    await ResultParameter.findAll({ where: { status } })
        .then(parameters => {
            if (parameters.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay parametros registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    parameters
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
//Mostrar parametro por id
//=================================
async function getResultParameterById(req, res) {
    let id = req.params.id;
    await ResultParameter.findOne({ where: { id } })
        .then(parameter => {
            if (parameter === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un parametro con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    parameter
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
//Crear parametro
//==============================
async function saveResultParameter(req, res) {
    let body = req.body;

    let parameter = {
        name: body.name,
        description: body.description,
        status: body.status || true,
    }

    await ResultParameter.create(parameter)
        .then(async result => {
            saveBitacora('ResultParameter', result.id, result.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Parametro creado con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Parametro no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar parametro
//==============================
async function updateResultParameter(req, res) {
    let id = req.params.id;

    await ResultParameter.update(req.body, { where: { id: id } })
        .then(async parameter => {
            if (parameter == 1) {
                saveBitacora('ResultParameter', id, 'update parameter', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Parametro actualizado con éxito',
                    parameter
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el parametro con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el parametro con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar parametro por id
//==================================
async function deleteResultParameter(req, res) {
    let id = req.params.id;

    await ResultParameter.destroy({ where: { id: id } })
        .then(async parameter => {
            if (parameter == 1) {
                saveBitacora('ResultParameter', id, 'delete parameter', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Parametro eliminado con éxito',
                    parameter
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un parametro con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el parametro con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar parametro
//=====================================
async function statusResultParameter(req, res) {
    let id = req.params.id;

    let parameter;
    await ResultParameter.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay parametro con el id requerido',
                });
            } else {
                parameter = result;
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

    if (parameter.status === true)
        change = false;

    await ResultParameter.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('ResultParameter', parameter.id, parameter.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Parametro actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el parametro con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getResultParameters,
    getResultParametersByStatus,
    getResultParameterById,
    saveResultParameter,
    updateResultParameter,
    deleteResultParameter,
    statusResultParameter
}