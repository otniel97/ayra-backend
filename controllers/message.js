// ====================================================
//      Controller Message
//      By ARYA Team ©
// ====================================================

const Message = require('../models').Message;
const MessageType = require('../models').MessageType;
const MessageCancel = require('../models').MessageCancelType;
const models = require('../models');
const serviceMail = require('../services/email');
const notification = require('../services/notification');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los mensajes
//======================================
async function getMessages(req, res) {
    await Message.findAll({
            include: [{
                    model: MessageType,
                    required: false,
                },
                {
                    model: MessageCancel,
                    required: false,
                }
            ]
        })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay mensajes registrados',
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

//==============================================
//Mostrar todas los mensajes por estatus
//==============================================
async function getMessagesByStatus(req, res) {
    let status = req.params.status;
    await Message.findAll({
            where: { status },
            include: [{
                model: MessageType,
                required: false,
            }]
        })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay mensajes registrados con el estatus ${status}`,
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
//Mostrar mensaje por id
//=================================
async function getMessageById(req, res) {
    let id = req.params.id;
    await Message.findOne({
            where: { id },
            include: [{
                model: MessageType,
                required: false,
            }]
        })
        .then(msg => {
            if (msg === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay mensaje con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    msg
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

//=================================
//Mostrar mensajes de un usuario
//=================================
async function getMessagesByUser(req, res) {
    let userId = req.user.id;

    await Message.findAll({
            where: { userId },
            include: [{
                    model: MessageType,
                    required: false,
                },
                {
                    model: MessageCancel,
                    required: false,
                }
            ]
        })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay mensajes registrados',
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
//Crear mensaje desde web
//==============================
async function saveMessage(req, res) {
    let body = req.body;

    let message = {
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        subject: body.subject,
        messageContent: body.messageContent,
        phoneNumber: body.phoneNumber,
        status: false,
        typeId: body.typeId,
        organizationId: body.organizationId
    }

    await Message.create(message)
        .then(async msg => {
            await notification.newMessage();
            var context = {
                name: msg.senderName,
                email: msg.senderEmail
            }
            if (serviceMail.sendMail('Mensaje recibido', msg.senderEmail, 'message', context))
                return res.status(200).json({
                    ok: true,
                    message: 'Mensaje creado con éxito',
                    msg
                });
            else
                return res.status(200).json({
                    ok: false,
                    message: 'No se ha podido enviar correo de confirmacion'
                })
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Mensaje no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Crear mensaje de usuario
//==============================
async function saveMessageUser(req, res) {
    let body = req.body;

    let user = await models.User.findOne({
        where: { id: req.user.id },
        include: [{
                model: models.People,
                required: false
            },
            {
                model: models.Patient,
                required: false
            }
        ]
    })
    if (!user) {
        res.status(400).json({
            ok: false,
            message: 'no existe el usuario'
        })
    }

    let name = '';
    let phoneNumber = '';
    if (user.Person) {
        name = user.Person.name;
        phoneNumber = user.Person.phoneNumber;
    }
    if (user.Patient) {
        name = user.Patient.name;
        phoneNumber = user.Patient.phoneNumber;
    }

    let message = {
        senderName: name,
        senderEmail: user.email,
        subject: body.subject,
        messageContent: body.messageContent,
        phoneNumber: phoneNumber,
        status: body.status || false,
        typeId: body.typeId,
        organizationId: body.organizationId,
        userId: user.id
    }

    await Message.create(message)
        .then(async msg => {
            await notification.newMessage();
            saveBitacora('Message', msg.id, msg.messageContent, 'create', req.user.id);
            return res.status(200).json({
                    ok: true,
                    message: 'Mensaje creado con éxito',
                    msg
                })
                .catch(err => {
                    res.status(500).send({
                        ok: false,
                        message: 'Mensaje no creado, ha ocurrido un error',
                        error: err.parent.detail
                    });
                });;
        })
}

//==============================
//Actualizar mensaje
//==============================
async function updateMessage(req, res) {
    let id = req.params.id;

    await Message.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('Message', id, 'update message', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Mensaje actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el mensaje con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el mensaje con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar mensaje por id
//==================================
async function deleteMessage(req, res) {
    let id = req.params.id;

    await Message.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Message', id, 'delete message', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Mensaje eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el mensaje con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el mensaje con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar mensaje
//=====================================
async function statusMessage(req, res) {
    let id = req.params.id;

    let msg;
    await Message.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay mensaje con el id requerido',
                });
            } else {
                msg = result;
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

    if (msg.status === true)
        change = false;

    await Message.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Message', msg.id, msg.messageContent, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Mensaje actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el mensaje con id = ${id}.`,
                error: err.message
            });
        });
}

//=================================
//Aceptar mensaje
//=================================
async function acceptMessage(req, res) {
    let id = req.params.messageId;

    if (!req.body.attentionDate)
        res.status(400).json({
            ok: false,
            message: 'Debe ingresar fecha de atención'
        });
    if (!req.body.response)
        res.status(400).json({
            ok: false,
            message: 'Debe ingresar respuesta'
        });

    today = new Date().toISOString().slice(0, 10);
    if (req.body.attentionDate <= today)
        res.status(400).json({
            ok: false,
            message: `La fecha de atención debe ser mayor que la fecha actual ${today}`
        });
    else {
        await Message.findOne({ where: { id }, })
            .then(async message => {
                if (message === null) {
                    res.status(200).json({
                        ok: true,
                        message: "No hay mensaje con el id requerido"
                    });
                } else {
                    message.canceled = false;
                    message.status = true;
                    message.attentionDate = req.body.attentionDate;
                    message.response = req.body.response;
                    await message.save();
                    if (message.userId != null)
                        await notification.messageResponse(message.userId);
                    saveBitacora('Message', id, 'message accepted', 'update canceled false', req.user.id);

                    if (message.userId === null) {
                        var context = {
                            response: req.body.response,
                            name: message.senderName,
                            attentionDate: req.body.attentionDate
                        }

                        if (!serviceMail.sendMail('Mensaje aceptado', message.senderEmail, 'messageAccept', context))
                            return res.status(200).json({
                                ok: false,
                                message: 'No se ha podido enviar el correo.'
                            })
                    }
                    res.status(200).json({
                        ok: true,
                        msg: "Mensaje aceptado",
                        message
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Mensaje no encontrado, ha ocurrido un error',
                    error: err.message
                });
            });;
    }
}

//=================================
//Cancelar mensaje
//=================================
async function cancelMessage(req, res) {
    let id = req.params.messageId;
    let cancelId = req.body.cancelId;

    if (!req.body.cancelId)
        res.status(400).json({
            ok: false,
            message: 'Debe ingresar tipo de cancelación'
        });
    if (!req.body.response)
        res.status(400).json({
            ok: false,
            message: 'Debe ingresar respuesta'
        });

    let cancel = await MessageCancel.findOne({ where: { id: cancelId } })
    if (!cancel) {
        res.status(400).json({
            ok: false,
            message: 'no existe tipo de cancelación asociado al mensaje'
        })
    }

    await Message.findOne({
            where: { id },
        })
        .then(async message => {
            if (message === null) {
                res.status(200).json({
                    ok: true,
                    message: "No hay mensaje con el id requerido"
                });
            } else {
                message.canceled = true;
                message.cancelId = cancelId;
                message.status = true;
                message.response = req.body.response;
                message.save();
                if (message.userId != null)
                    await notification.messageResponse(message.userId);

                let cancel = await MessageCancel.findOne({ where: { id: message.cancelId } });

                if (message.userId === null) {
                    var context = {
                        response: req.body.response,
                        name: message.senderName,
                        cancelReason: cancel.name,
                        cancelDescription: cancel.description
                    }

                    if (!serviceMail.sendMail('Mensaje rechazado', message.senderEmail, 'messageCancel', context))
                        return res.status(200).json({
                            ok: false,
                            message: 'No se ha podido enviar el correo.'
                        })
                }
                saveBitacora('Message', id, 'message canceled', 'update canceled true', req.user.id);
                res.status(200).json({
                    ok: true,
                    msg: "Mensaje cancelado",
                    message
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Mensaje no encontrada, ha ocurrido un error',
                error: err.message
            });
        });;
}

//==============================================
//Mostrar todas los mensajes cancelados
//==============================================
async function getMessagesCancel(req, res) {

    await Message.findAll({
            where: { canceled: true },
            include: [{
                    model: MessageType,
                    required: false,
                },
                {
                    model: MessageCancel,
                    required: false,
                }
            ]
        })
        .then(messages => {
            if (messages.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay mensajes cancelados`,
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

module.exports = {
    getMessages,
    getMessagesByStatus,
    getMessageById,
    getMessagesByUser,
    saveMessage,
    saveMessageUser,
    updateMessage,
    deleteMessage,
    statusMessage,
    acceptMessage,
    cancelMessage,
    getMessagesCancel
}