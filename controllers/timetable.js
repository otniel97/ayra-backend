// ====================================================
//      Controller Timetable
//      By ARYA Team ©
// ====================================================

const Timetable = require('../models').Timetable;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los horarios
//======================================
async function getTimetables(req, res) {
    await Timetable.findAll({})
        .then(timetables => {
            if (timetables.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay horarios registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    timetables
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

//==========================================
//Mostrar todas los horarios por estatus
//==========================================
async function getTimetablesByStatus(req, res) {
    let status = req.params.status;
    await Timetable.findAll({ where: { status } })
        .then(timetables => {
            if (timetables.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay horarios registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    timetables
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
//Mostrar horario por id
//=================================
async function getTimetableById(req, res) {
    let id = req.params.id;
    await Timetable.findOne({ where: { id } })
        .then(timetable => {
            if (timetable === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay horarios con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    timetable
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
//Crear horario
//==============================
async function saveTimetable(req, res) {
    let body = req.body;
    let timeStart = req.body.timeStart;
    let timeEnd = req.body.timeEnd;


    if (timeStart >= timeEnd) {
        return res.status(400).json({
            ok: false,
            message: 'Hora inicial no puede ser mayor o igual a hora final'
        });
    }

    let time = {
        description: body.description,
        day: body.day,
        timeStart: body.timeStart,
        timeEnd: body.timeEnd,
        dayNumber: Number(body.dayNumber),
        status: body.status || true,
        maxPatients: body.maxPatients
    }

    await Timetable.create(time)
        .then(async timetable => {
            saveBitacora('Timetable', timetable.id, timetable.description, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Horario creado con éxito',
                timetable
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Horario no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar horario
//==============================
async function updateTimetable(req, res) {
    let id = req.params.id;
    let timeStart = req.body.timeStart;
    let timeEnd = req.body.timeEnd;

    if (timeStart >= timeEnd) {
        return res.status(400).json({
            ok: false,
            message: 'Hora inicial no puede ser mayor o igual a hora final'
        });
    }

    await Timetable.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Timetable', id, 'timetable update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Horario actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el horario con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el horario con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar horario por id
//==================================
async function deleteTimetable(req, res) {
    let id = req.params.id;

    await Timetable.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Timetable', id, 'timetable delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Horario eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el horario con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el horario con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar horario
//=====================================
async function statusTimetable(req, res) {
    let id = req.params.id;

    let timetable;
    await Timetable.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay horario con el id requerido',
                });
            } else {
                timetable = result;
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

    if (timetable.status === true)
        change = false;

    await Timetable.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Timetable', timetable.id, timetable.description, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Horario actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el horario con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getTimetables,
    getTimetablesByStatus,
    getTimetableById,
    saveTimetable,
    updateTimetable,
    deleteTimetable,
    statusTimetable,
}