// ====================================================
//      Controller AppointmentType
//      By ARYA Team ©
// ====================================================

const AppointmentType = require('../models').AppointmentType;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de cita
//======================================
async function getAppointmentTypes(req, res) {
    await AppointmentType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cita registrado',
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
//Mostrar tipo de cita por id
//=================================
async function getAppointmentTypeById(req, res) {
    let id = req.params.id;
    await AppointmentType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cita con el id requerido',
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
//Mostrar todas los tipos de cita por estatus
//==============================================
async function getAppointmentTypesByStatus(req, res) {
    let status = req.params.status;
    await AppointmentType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay tipos de cita registrados con el estatus ${status}`,
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
//Crear tipo de cita
//==============================
async function saveAppointmentType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await AppointmentType.create(type)
        .then(async type => {
            saveBitacora('AppointmentType', type.id, type.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de cita creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de cita no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de cita
//==============================
async function updateAppointmentType(req, res) {
    let id = req.params.id;

    await AppointmentType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('AppointmentType', id, 'update type', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de cita actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de cita con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de cita con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de cita por id
//==================================
async function deleteAppointmentType(req, res) {
    let id = req.params.id;

    await AppointmentType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('AppointmentType', id, 'delete type', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de cita eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de cita con id = ${id}.`
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

//=====================================
//Activar desactivar tipo de cita
//=====================================
async function statusAppointmentType(req, res) {
    let id = req.params.id;

    let typeAppointment;
    await AppointmentType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de cita con el id requerido',
                });
            } else {
                typeAppointment = type;
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

    if (typeAppointment.status === true)
        change = false;

    await AppointmentType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('AppointmentType', typeAppointment.id, typeAppointment.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de cita actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de cita con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar citas de un tipo de cita
//==========================================
async function getAppointmentsByType(req, res) {
    let id = req.params.id;
    await models.Appointment.findAll({ where: { typeId: id }, })
        .then(appointments => {
            if (appointments.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay citas con el tipo de cita requerido',
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
    getAppointmentTypes,
    getAppointmentTypeById,
    getAppointmentTypesByStatus,
    saveAppointmentType,
    updateAppointmentType,
    deleteAppointmentType,
    statusAppointmentType,
    getAppointmentsByType,
}