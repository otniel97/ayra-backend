// ====================================================
//      Controller Assigned Donatives
//      By ARYA Team ©
// ====================================================

const Donative = require('../models').Donative;
const Patient = require('../models').Patient;
const AssignedDonative = require('../models').AssignedDonative;
const notification = require('../services/notification');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Asignar un donativo a un paciente
//======================================

async function saveAssignedDonation(req, res) {
    let body = req.body;
    const currentDate = new Date();
    let newAssignedDonative = ({
        patientId: body.patientId,
        donativeId: body.donativeId,
        assignationDate: currentDate,
        description: body.description,
        status: body.status || true
    })

    await AssignedDonative.create(newAssignedDonative)
        .then(async assignedDonative => {
            if (assignedDonative) {
                await notification.newAssignedDonative(assignedDonative.patientId);
                saveBitacora('AssignedDonative', assignedDonative.id, assignedDonative.description, 'create', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Donativo asignado con éxito',
                    assignedDonative
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.parent.detail
            })
        })
}

//======================================
//Obtener donativos de un paciente
//======================================
async function getAssignedDonativesByPatient(req, res) {
    let params = req.params;

    await Patient.findOne({
            where: { id: params.id },
            include: [{
                model: AssignedDonative,
                include: [Donative]
            }]
        })
        .then(patient => {
            if (!patient)
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un paciente con ese id.'
                })
            else {
                if (patient.AssignedDonatives.length === 0)
                    return res.status(200).json({
                        ok: false,
                        message: 'Este paciente no tiene asignaciones de donativos'
                    });
                return res.status(200).json({
                    ok: true,
                    message: 'Donativos asignados al paciente',
                    patient
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error.',
                error: err.message
            })
        });
}

//======================================
//Obtener donativos de un paciente
//======================================
async function getAssignedDonativesByDonative(req, res) {
    let params = req.params;
    console.log(params.id);

    await Donative.findOne({
            where: { id: params.id },
            include: [{
                model: AssignedDonative,
                include: [Patient]
            }]
        })
        .then(donative => {
            if (!donative)
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un donativo con ese id.'
                })
            else {
                if (donative.AssignedDonatives.length === 0)
                    return res.status(200).json({
                        ok: false,
                        message: 'Este donativo no está asignado a ningún paciente.'
                    })
                return res.status(200).json({
                    ok: true,
                    message: 'Asignaciones de este donativo',
                    donative
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error.',
                error: err.message
            })
        });

}

//======================================
//Obtener todas las asignaciones
//======================================

async function getAssignedDonatives(req, res) {
    await AssignedDonative.findAll({
            include: [Patient, Donative]
        })
        .then(assignedDonatives => {
            return res.status(200).json({
                ok: true,
                message: 'Todas las asignaciones',
                assignedDonatives
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error.',
                error: err.message
            })
        });
}

//======================================
//Obtener donativos por un status
//======================================
async function getAssignedDonativesByStatus(req, res) {
    let status = req.params.status;

    await AssignedDonative.findAll({
            where: { status },
            include: [Patient, Donative]
        })
        .then(assignedDonatives => {
            if (assignedDonatives.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No existen asignaciones con ese estatus.'
                });
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Todas las asignaciones',
                    assignedDonatives
                });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error.',
                error: err.message
            })
        });
}

//=====================================
//Activar desactivar asignacion
//=====================================
async function statusAssignedDonative(req, res) {
    let id = req.params.id;

    await AssignedDonative.findOne({ where: { id } })
        .then(async assignedDonative => {
            if (assignedDonative === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No esxiste una asignación con el id requerido.',
                });
            } else {
                const check = assignedDonative.status;
                if (check === false)
                    assignedDonative.status = true;
                else
                    assignedDonative.status = false;

                await assignedDonative.save();

                saveBitacora('AssignedDonative', assignedDonative.id, assignedDonative.description, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Asignación actualizada con éxito',
                    assignedDonative
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
    saveAssignedDonation,
    getAssignedDonativesByPatient,
    getAssignedDonativesByDonative,
    getAssignedDonatives,
    getAssignedDonativesByStatus,
    statusAssignedDonative
}