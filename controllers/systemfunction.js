// ====================================================
//      Controller Function
//      By ARYA Team ©
// ====================================================

const SystemFunction = require('../models').SystemFunction;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas la funciones
//======================================
async function getSystemFunctions(req, res) {
    await SystemFunction.findAll({
            include: [{
                    model: SystemFunction,
                    required: false,
                    as: 'child'
                },
                {
                    model: SystemFunction,
                    required: false,
                    as: 'parent'
                }
            ]
        })
        .then(systemFunctions => {
            if (systemFunctions.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay funciones registradss',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    systemFunctions
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
//Mostrar todas las funciones
//==============================================
async function getSystemFunctionsByStatus(req, res) {
    let status = req.params.status;
    await SystemFunction.findAll({
            where: { status },
            include: [{
                    model: SystemFunction,
                    required: false,
                    as: 'child'
                },
                {
                    model: SystemFunction,
                    required: false,
                    as: 'parent'
                }
            ]
        })
        .then(systemFunctions => {
            if (systemFunctions.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay funciones registradss con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    systemFunctions
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
//Mostrar funcion por id
//=================================
async function getSystemFunctionById(req, res) {
    let id = req.params.id;
    await SystemFunction.findOne({
            where: { id },
            include: [{
                    model: SystemFunction,
                    required: false,
                    as: 'child'
                },
                {
                    model: SystemFunction,
                    required: false,
                    as: 'parent'
                }
            ]
        })
        .then(systemFunctions => {
            if (systemFunctions === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe una función con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    systemFunctions
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
//Crear funcion
//==============================
async function saveSystemFunction(req, res) {
    let body = req.body;

    let systemFunction = {
        name: body.name,
        description: body.description,
        status: body.status || true,
    }

    await SystemFunction.create(systemFunction)
        .then(async systemFunction => {
            saveBitacora('SystemFunction', systemFunction.id, systemFunction.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Función creada con éxito',
                systemFunction
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Función no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar funcion
//==============================
async function updateSystemFunction(req, res) {
    let id = req.params.id;

    await SystemFunction.update(req.body, { where: { id: id } })
        .then(async systemFunction => {
            if (systemFunction == 1) {
                saveBitacora('SystemFunction', id, 'systemFunction update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Funcion actualizada con éxito',
                    systemFunction
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la funcion con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la funcion con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar funcion por id
//==================================
async function deleteSystemFunction(req, res) {
    let id = req.params.id;

    await SystemFunction.destroy({ where: { id: id } })
        .then(async systemFunction => {
            if (systemFunction == 1) {
                saveBitacora('SystemFunction', id, 'systemFunction delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Funcion eliminada con éxito',
                    systemFunction
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe una funciónon con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la funciónon con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar funcion
//=====================================
async function statusSystemFunction(req, res) {
    let id = req.params.id;

    let systemFunction;
    await SystemFunction.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe una función con el id requerido',
                });
            } else {
                systemFunction = result;
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

    if (systemFunction.status === true)
        change = false;

    await SystemFunction.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('SystemFunction', systemFunction.id, systemFunction.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Función actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la función con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getSystemFunctions,
    getSystemFunctionsByStatus,
    getSystemFunctionById,
    saveSystemFunction,
    updateSystemFunction,
    deleteSystemFunction,
    statusSystemFunction
}