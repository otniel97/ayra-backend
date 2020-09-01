// ====================================================
//      Controller Notification
//      By ARYA Team ©
// ====================================================

const Notification = require('../models').Notification;
const models = require('../models');
const { successMsg, errorMsg } = require('../utils/responses');

//==============================================
//Mostrar notificaciones de usuario no leídas
//==============================================
async function getAllByUser(req, res) {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.id, status: false },
            include: { model: models.NotificationType }
        })
        notifications.length ?
            successMsg(res, 200, 'correcto', notifications) :
            successMsg(res, 200, `No hay notificaciones`)

    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Marcar notifiación leída por id
//==============================================
async function statusNotification(req, res, model) {
    const id = req.params.id;
    try {
        const notification = await Notification.findOne({ where: { id, userId: req.user.id } })

        if (!notification)
            successMsg(res, 200, `No se encontraron resultados para el id: ${id}.`)
        else {
            notification.status = true;
            await notification.save();
            const msg = notification.name ?
                `Se edito ${ notification.id } con exito` :
                'Actualización de datos exitosa'

            successMsg(res, 200, msg, notification)
        }
    } catch (error) {
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==============================================================
//Marcar todas las notifiaciones leídas de un usuario logeado
//==============================================================
async function statusAllNotification(req, res) {
    try {
        const notification = await Notification.update({ status: true }, { where: { userId: req.user.id } })
        if (notification[0] === 0)
            successMsg(res, 200, `No se encontraron resultados para el usuario: ${req.user.id}.`)
        else {
            successMsg(res, 200, 'Notificaciones marcadas leídas', notification)
        }
    } catch (error) {
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

module.exports = {
    getAllByUser,
    statusNotification,
    statusAllNotification,

}