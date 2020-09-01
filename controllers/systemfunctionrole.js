// ====================================================
//      Controller SystemFunctionRole
//      By ARYA Team ©
// ====================================================

const SystemFunction = require('../models').SystemFunction;
const Role = require('../models').Role;
const SystemFunctionRole = require('../models').SystemFunctionRole;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Agregar funciones a roles
//======================================

async function addSystemFunctionToRole(req, res) {

    //Buscar el rol
    await Role.findOne({
            where: { id: req.body.roleId }
        })
        .then(async role => {
            //verificar que el rol existe
            if (!role)
                return res.status(200).json({
                    ok: false,
                    message: 'Este rol no existe.'
                });

            //array que guarda los systemfunctions
            var functionsRoleArray = [];

            //recorrer el arreglo de systemFunctions
            req.body.systemFunctions.forEach((item) => {
                var newSystemFunctionRole = {
                    systemFunctionId: item.id,
                    roleId: role.id,
                    status: true
                }

                functionsRoleArray.push(newSystemFunctionRole);
            });

            //guardar las functionesRoles
            await SystemFunctionRole.bulkCreate(functionsRoleArray)
                .then(async systemFunctionRoles => {
                    saveBitacora('SystemFunctionRole', role.id, role.name, 'add function to role', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Agregadas funciones al rol',
                        systemFunctionRoles
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        ok: false,
                        message: 'Ha ocurrido un error',
                        error: err.message
                    })
                });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Mostrar funciones de un rol
//======================================

async function getSystemFunctionRolesById(req, res) {
    let id = req.params.id;

    await Role.findOne({
            where: { id },
            include: [{
                model: SystemFunction,
                include: [
                    { model: SystemFunction, as: 'parent' },
                    { model: SystemFunction, as: 'child' }
                ],
                required: false,
            }]
        })
        .then(async role => {
            if (!role)
                return res.status(200).json({
                    ok: false,
                    message: 'El rol no existe'
                });
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Funciones asociadas al rol',
                    functions: role.SystemFunctions
                });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Modificar funciones a roles
//======================================
async function updateSystemFunctionsRoles(req, res) {
    let body = req.body;
    let params = req.params;

    await Role.findOne({ where: { id: params.id } })
        .then(async role => {
            if (!role)
                return res.status(200).json({
                    ok: false,
                    message: 'El rol no existe'
                })
            else {
                //obtener todas las funciones de los roles
                const systemFunctions = await role.getSystemFunctions();

                //remover esas funciones
                role.removeSystemFunctions(systemFunctions);
                saveBitacora('SystemFunctionRole', role.id, role.name, 'remove function to role', req.user.id);

                //array que guarda los systemfunctions
                var functionsRoleArray = [];

                //recorrer el arreglo de systemFunctions
                req.body.SystemFunctions.forEach((item) => {
                    var newSystemFunctionRole = {
                        systemFunctionId: item.id,
                        roleId: role.id,
                        status: true
                    }
                    functionsRoleArray.push(newSystemFunctionRole);
                });

                //guardar las functionesRoles
                await SystemFunctionRole.bulkCreate(functionsRoleArray)
                    .then(async systemFunctionRoles => {
                        saveBitacora('SystemFunctionRole', role.id, role.name, 'add function to role', req.user.id);
                        return res.status(200).json({
                            ok: true,
                            message: 'Rol actualizado con funciones exitosamente',
                            systemFunctionRoles
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            ok: false,
                            message: 'Ha ocurrido un error',
                            error: err.message
                        })
                    });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Modificar funciones a roles
//======================================

async function deleteSystemFunctionRoles(req, res) {
    let params = req.params;

    await Role.findOne({ where: { id: params.id } })
        .then(async role => {
            //obtener todas las funciones de los roles
            const systemFunctions = await role.getSystemFunctions();
            //remover esas funciones
            role.removeSystemFunctions(systemFunctions);
            saveBitacora('SystemFunctionRole', role.id, role.name, 'remove function to role', req.user.id);

            return res.status(200).json({
                ok: true,
                message: 'Todas las funciones se han eliminado del rol',
                role
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Mostrar funciones de todos los roles
//======================================
async function getSystemFunctionsRoles(req, res) {
    await Role.findAll({
            include: [{
                model: SystemFunction
            }]
        })
        .then(role => {
            if (!role)
                return res.status(200).json({
                    ok: false,
                    message: 'El rol no existe'
                });
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Funciones asociadas todos los roles',
                    role
                });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}


module.exports = {
    addSystemFunctionToRole,
    getSystemFunctionRolesById,
    updateSystemFunctionsRoles,
    deleteSystemFunctionRoles,
    getSystemFunctionsRoles
}