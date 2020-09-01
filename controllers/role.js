// ====================================================
//      Controller Role
//      By ARYA Team ©
// ====================================================

const Role = require('../models').Role;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los roles
//======================================
async function getRoles(req, res) {
    await Role.findAll()
        .then(roles => {
            if (roles.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay roles registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    roles
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
//Mostrar todos los roles
//==============================================
async function getRolesByStatus(req, res) {
    let status = req.params.status;
    await Role.findAll({ where: { status } })
        .then(roles => {
            if (roles.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay roles registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    roles
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
//Mostrar rol por id
//=================================
async function getRoleById(req, res) {
    let id = req.params.id;
    await Role.findOne({ where: { id } })
        .then(role => {
            if (role === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un rol con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    role
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
//Crear rol
//==============================
async function saveRole(req, res) {
    let body = req.body;

    let role = {
        name: body.name,
        description: body.description,
        status: body.status || true,
    }

    await Role.create(role)
        .then(async role => {
            saveBitacora('Rol', role.id, role.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Rol creado con éxito',
                role
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Rol no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar rol
//==============================
async function updateRole(req, res) {
    let id = req.params.id;

    await Role.update(req.body, { where: { id: id } })
        .then(async role => {
            if (role == 1) {
                saveBitacora('Role', id, 'role update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Rol actualizado con éxito',
                    role
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la rol con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el rol con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar rol por id
//==================================
async function deleteRole(req, res) {
    let id = req.params.id;

    await Role.destroy({ where: { id: id } })
        .then(async role => {
            if (role == 1) {
                saveBitacora('Role', id, 'role delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Rol eliminada con éxito',
                    role
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe un rol con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el rol con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar rol
//=====================================
async function statusRole(req, res) {
    let id = req.params.id;

    await Role.findOne({ where: { id } })
        .then(async role => {
            if (role === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay rol con el id requerido',
                });
            } else {
                const check = role.status;
                if (check === false)
                    role.status = true;
                else
                    role.status = false;

                await role.save();

                saveBitacora('Role', role.id, role.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Rol actualizado con éxito',
                    role
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

module.exports = {
    getRoles,
    getRolesByStatus,
    getRoleById,
    saveRole,
    updateRole,
    deleteRole,
    statusRole
}