// ====================================================
//      Controller AppointmentCancelType
//      By ARYA Team ©
// ====================================================

const AppointmentCancel = require('../models').AppointmentCancelType;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de cancelación
//======================================
async function getAppointmentCancels(req, res) {
    await AppointmentCancel.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cancelación registrado',
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

//===================================
//Mostrar tipo de cancelación por id
//===================================
async function getAppointmentCancelById(req, res) {
    let id = req.params.id;
    await AppointmentCancel.findOne({ where: { id }, })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cancelación con el id requerido',
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

//==============================================
//Mostrar los tipos de cancelación por estatus
//==============================================
async function getAppointmentCancelsByStatus(req, res) {
    let status = req.params.status;
    await AppointmentCancel.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de cancelación registrados con el estatus ${status}`,
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
//Crear tipo de cancelación
//==============================
async function saveAppointmentCancel(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await AppointmentCancel.create(type)
        .then(async type => {
            saveBitacora('AppointmentCancelType', type.id, type.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de cancelación creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de cancelación no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de cancelación
//==============================
async function updateAppointmentCancel(req, res) {
    let id = req.params.id;

    await AppointmentCancel.update(req.body, { where: { id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('AppointmentCancelType', id, 'Update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de cancelación actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de cancelación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de cancelación con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//====================================
//Eliminar tipo de cancelación por id
//====================================
async function deleteAppointmentCancel(req, res) {
    let id = req.params.id;

    await AppointmentCancel.destroy({ where: { id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('AppointmentCancelType', id, 'delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de cancelación eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de cancelación con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de cita con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//======================================
//Activar desactivar tipo de cancelación
//======================================
async function statusAppointmentCancel(req, res) {
    let id = req.params.id;

    await AppointmentCancel.findOne({ where: { id } })
        .then(async type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cancelación con el id requerido',
                });
            } else {
                const check = type.status;
                if (check === false)
                    type.status = true;
                else
                    type.status = false;

                await type.save();

                saveBitacora('AppointmentCancelType', type.id, type.description, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Tipo de cancelación actualizado con éxito',
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

//===================================================
//Mostrar citas canceladas de un tipo de cancelación
//===================================================
async function getAppointmentsByCancel(req, res) {
    let id = req.params.id;
    await models.Appointment.findAll({ where: { cancelId: id }, })
        .then(appointments => {
            if (appointments.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay citas canceladas con el tipo de cancelación requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    appointments
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
    getAppointmentCancels,
    getAppointmentCancelById,
    getAppointmentCancelsByStatus,
    saveAppointmentCancel,
    updateAppointmentCancel,
    deleteAppointmentCancel,
    statusAppointmentCancel,
    getAppointmentsByCancel,
}