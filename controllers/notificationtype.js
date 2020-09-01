// ====================================================
//      Controller NotificationType
//      By ARYA Team ©
// ====================================================

const NotificationType = require('../models').NotificationType;
const { saveBitacora } = require('../services/bitacora');

//========================================
//Mostrar todos los tipos de notificación
//========================================
async function getNotificationTypes(req, res) {
    await NotificationType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de notificación registrado',
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

//=======================================
//Mostrar tipo de notificación por status
//=======================================
async function getNotificationTypesByStatus(req, res) {
    let status = req.params.status;
    await NotificationType.findAll({
            where: { status }
        })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de notificación con el status requerido',
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
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//====================================
//Mostrar tipo de notificación por id
//====================================
async function getNotificationTypeById(req, res) {
    let id = req.params.id;
    await NotificationType.findOne({
            where: { id }
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de notificación con el id requerido',
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
//Crear tipo de notificación
//==============================
async function saveNotificationType(req, res) {
    let body = req.body;

    let notification = {
        name: body.name,
        message: body.message,
        status: body.status || true
    }

    await NotificationType.create(notification)
        .then(async type => {
            saveBitacora('NotificationType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de notificación creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de notificación no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//================================
//Actualizar tipo de notificación
//================================
async function updateNotificationType(req, res) {
    let id = req.params.id;

    await NotificationType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('NotificationType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de notificación actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de notificación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de notificación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Eliminar tipo de notificación por id
//=====================================
async function deleteNotificationType(req, res) {
    let id = req.params.id;

    await NotificationType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('NotificationType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de notificación eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de notificación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de notificación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=======================================
//Activar desactivar tipo de notificación
//=======================================
async function statusNotificationType(req, res) {
    let id = req.params.id;

    await NotificationType.findOne({ where: { id } })
        .then(async type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de notificación con el id requerido',
                });
            } else {
                const check = type.status;
                if (check === false)
                    type.status = true;
                else
                    type.status = false;

                await type.save();

                saveBitacora('NotificationType', type.id, type.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Tipo de notificación actualizado con éxito',
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

module.exports = {
    getNotificationTypes,
    getNotificationTypesByStatus,
    getNotificationTypeById,
    saveNotificationType,
    updateNotificationType,
    deleteNotificationType,
    statusNotificationType,
}