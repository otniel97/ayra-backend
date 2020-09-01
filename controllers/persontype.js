// ====================================================
//      Controller PersonType
//      By ARYA Team ©
// ====================================================

const PersonType = require('../models').PersonType;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de persona
//======================================
async function getPersonTypes(req, res) {
    await PersonType.findAll()
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipos de persona registrados',
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

//=====================================
//Mostrar tipo de persona por status
//====================================
async function getPersonTypesByStatus(req, res) {
    let status = req.params.status;
    await PersonType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de persona registrados con el status ${status}`,
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
//Mostrar tipo de persona por id
//=================================
async function getPersonTypeById(req, res) {
    let id = req.params.id;
    await PersonType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de persona con el id requerido',
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

//==============================
//Crear tipo de persona
//==============================
async function savePersonType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await PersonType.create(type)
        .then(async result => {
            saveBitacora('PersonType', result.id, result.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de persona creado con éxito',
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de persona no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de persona
//==============================
async function updatePersonType(req, res) {
    let id = req.params.id;

    await PersonType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PersonType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de persona actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de persona con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de persona con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de persona por id
//==================================
async function deletePersonType(req, res) {
    let id = req.params.id;

    await PersonType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('PersonType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de persona eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de persona  con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de persona con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de persona
//=====================================
async function statusPersonType(req, res) {
    let id = req.params.id;

    let personType;
    await PersonType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay el tipo de persona con el id requerido',
                });
            } else {
                personType = type;
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

    if (personType.status === true)
        change = false;

    await PersonType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('PersonType', personType.id, personType.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de persona actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de persona con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getPersonTypes,
    getPersonTypesByStatus,
    getPersonTypeById,
    savePersonType,
    updatePersonType,
    deletePersonType,
    statusPersonType,
}