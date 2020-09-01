// ====================================================
//      Controller RiskFactor
//      By ARYA Team ©
// ====================================================

const RiskFactor = require('../models').RiskFactor;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los riesgos
//======================================
async function getRiskFactories(req, res) {
    await RiskFactor.findAll()
        .then(risks => {
            if (risks.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay riesgos registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    risks
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
//Mostrar riesgo por id
//=================================
async function getRiskFactorById(req, res) {
    let id = req.params.id;
    await RiskFactor.findOne({ where: { id } })
        .then(risks => {
            if (risks === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay riesgo con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    risks
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
//Mostrar factores de riesgo por estatus
//==============================================
async function getRiskFactorsByStatus(req, res) {
    let status = req.params.status;
    await RiskFactor.findAll({ where: { status } })
        .then(riskfactors => {
            if (riskfactors.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay factores de riesgo registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    riskfactors
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
//Crear riesgo
//==============================
async function saveRiskFactor(req, res) {
    let body = req.body;

    let risks = {
        name: body.name,
        description: body.description,
        status: body.status || true
    }

    await RiskFactor.create(risks)
        .then(async riskFactor => {
            saveBitacora('RiskFactor', riskFactor.id, riskFactor.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Riesgo creado con éxito',
                riskFactor
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Riesgo no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar riesgo
//==============================
async function updateRiskFactor(req, res) {
    let id = req.params.id;

    await RiskFactor.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('RiskFactor', id, 'riskFactor update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Riesgo actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el riesgo con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el riesgo con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar riesgo por id
//==================================
async function deleteRiskFactor(req, res) {
    let id = req.params.id;

    await RiskFactor.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('RiskFactor', id, 'riskFactor delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Riesgo eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el riesgo  con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el riesgo  con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar riesgo
//=====================================
async function statusRiskFactor(req, res) {
    let id = req.params.id;

    let riskFactor;
    await RiskFactor.findOne({ where: { id } })
        .then(risk => {
            if (risk === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay el riesgo con el id requerido',
                });
            } else {
                riskFactor = risk;
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

    if (riskFactor.status === true)
        change = false;

    await RiskFactor.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('RiskFactor', riskFactor.id, riskFactor.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Riesgo actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el riesgo con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getRiskFactories,
    getRiskFactorById,
    getRiskFactorsByStatus,
    saveRiskFactor,
    updateRiskFactor,
    deleteRiskFactor,
    statusRiskFactor,
}