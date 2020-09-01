// ====================================================
//      Controller ParticipantType
//      By ARYA Team ©
// ====================================================

const ParticipantType = require('../models').ParticipantType;
const { saveBitacora } = require('../services/bitacora');

//========================================
//Mostrar todos los tipos de participante
//========================================
async function getParticipantTypes(req, res) {
    await ParticipantType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de participante registrado',
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
//Mostrar tipo de participante por id
//=====================================
async function getParticipantTypeById(req, res) {
    let id = req.params.id;
    await ParticipantType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de participante con el id requerido',
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

//=====================================================
//Mostrar todas los tipos de participante por estatus
//=====================================================
async function getParticipantTypesByStatus(req, res) {
    let status = req.params.status;
    await ParticipantType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de participante registrados con el estatus ${status}`,
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
//Crear tipo de participante
//==============================
async function saveParticipantType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await ParticipantType.create(type)
        .then(async type => {
            saveBitacora('ParticipantType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de participante creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de participante no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//=================================
//Actualizar tipo de participante
//=================================
async function updateParticipantType(req, res) {
    let id = req.params.id;

    await ParticipantType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('ParticipantType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de participante actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de participante con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de participante con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Eliminar tipo de participante por id
//=====================================
async function deleteParticipantType(req, res) {
    let id = req.params.id;

    await ParticipantType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('ParticipantType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de participante eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de participante con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de participante con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//========================================
//Activar desactivar tipo de participante
//========================================
async function statusParticipantType(req, res) {
    let id = req.params.id;

    let typeParticipant;
    await ParticipantType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de participante con el id requerido',
                });
            } else {
                typeParticipant = type;
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

    if (typeParticipant.status === true)
        change = false;

    await ParticipantType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('ParticipantType', typeParticipant.id, typeParticipant.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de participante actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de participante con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar post de un tipo de participante
//==========================================
async function getParticipantsByType(req, res) {

}


module.exports = {
    getParticipantTypes,
    getParticipantTypeById,
    getParticipantTypesByStatus,
    saveParticipantType,
    updateParticipantType,
    deleteParticipantType,
    statusParticipantType,
    getParticipantsByType,
}