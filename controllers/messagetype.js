// ====================================================
//      Controller Message Type
//      By ARYA Team ©
// ====================================================

const MessageType = require('../models').MessageType;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de mensajes
//======================================
async function getMessageTypes(req, res) {
    await MessageType.findAll({})
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de mensaje registrado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    messages
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
//Mostrar tipo de mensaje por id
//=================================
async function getMessageTypeById(req, res) {
    let id = req.params.id;
    await MessageType.findOne({ where: { id } })
        .then(message => {
            if (message === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de mensaje con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    message
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

//=================================================
//Mostrar todos los tipos de mensajes por status
//=================================================
async function getMessageTypesByStatus(req, res) {
    let status = req.params.status;
    await MessageType.findAll({ where: { status } })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipo de mensaje registrado con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    messages
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
//Crear tipo de mensaje
//==============================
async function saveMessageType(req, res) {
    let body = req.body;

    let message = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await MessageType.create(message)
        .then(async msg => {
            saveBitacora('Message', msg.id, msg.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de mensaje creado con éxito',
                msg
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de mensaje no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de mensaje
//==============================
async function updateMessageType(req, res) {
    let id = req.params.id;

    await MessageType.update(req.body, { where: { id: id } })
        .then(data => {
            if (data == 1) {
                saveBitacora('Message', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de mensaje actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de mensaje con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de mensaje con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de mensaje por id
//==================================
async function deleteMessageType(req, res) {
    let id = req.params.id;

    await MessageType.destroy({ where: { id: id } })
        .then(async data => {
            saveBitacora('Message', id, 'delete type', 'delete', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de mensaje eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de mensaje con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de mensaje con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de mensaje
//=====================================
async function statusMessageType(req, res) {
    let id = req.params.id;

    let typeMessage;
    await MessageType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de mensaje con el id requerido',
                });
            } else {
                typeMessage = type;
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

    if (typeMessage.status === true)
        change = false;

    await MessageType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Message', typeMessage.id, typeMessage.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de mensaje actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de mensaje con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar mensajes de un tipo de mensaje
//==========================================
async function getMessagesByType(req, res) {
    let typeId = req.params.typeId;
    await models.Message.findAll({ where: { typeId } })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay mensajes del tipo de mensaje con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    messages
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
    getMessageTypes,
    getMessageTypeById,
    getMessageTypesByStatus,
    saveMessageType,
    updateMessageType,
    deleteMessageType,
    statusMessageType,
    getMessagesByType,
}