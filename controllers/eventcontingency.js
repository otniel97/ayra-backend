// ====================================================
//      Controller EventContingency
//      By ARYA Team ©
// ====================================================

const models = require('../models');
const EventContingency = require('../models').EventContingency;

//======================================
//Mostrar todas las contingencias
//======================================
async function getEventContingencies(req, res) {
    await EventContingency.findAll({
            include: [{
                model: models.EventDetail,
                required: false,
                include: [
                    models.Event
                ]
            }, {
                model: models.EventCancelType,
                required: false
            }]
        })
        .then(contingencies => {
            if (contingencies.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No se ha registrado ninguna contingencia.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Correcto.',
                    contingencies
                })
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
//Mostrar contingencias de un detalle de evento id
//=================================================
async function getEventContingenciesByEventDetail(req, res) {
    let eventDetailId = req.params.eventDetailId;
    let detail = await models.EventDetail.findOne({ where: { id: eventDetailId } });
    if (!detail) {
        res.status(400).json({
            ok: false,
            message: `no existe el detalle evento con id ${eventDetailId}`
        })
    }
    await EventContingency.findAll({
            where: { eventDetailId },
            include: [{
                model: models.EventDetail,
                required: false,
                include: [
                    models.Event
                ]
            }, {
                model: models.EventCancelType,
                required: false
            }]
        })
        .then(contingencies => {
            if (contingencies.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No se ha registrado ninguna contingencia.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Correcto.',
                    contingencies
                })
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
    getEventContingencies,
    getEventContingenciesByEventDetail
}