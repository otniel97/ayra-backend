// ====================================================
//      Controller Bitacora
//      By ARYA Team ©
// ====================================================

const User = require('../models').User;
const Bitacora = require('../models').Bitacora;
const Op = require('../models').Sequelize.Op;
const { successMsg, errorMsg } = require('../utils/responses');

//======================================
//Obtener toda la bitacora
//======================================
async function getBitacora(req, res) {
    try {
        const bitacora = await Bitacora.findAll({
            include: [{
                model: User,
                required: true
            }]
        })
        bitacora.length ?
            successMsg(res, 200, 'correcto', bitacora) :
            successMsg(res, 200, `No existen registros en la bitacora`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================
//Obtener bitacora por id usuario
//======================================
async function getBitacoraByUserId(req, res) {
    let userId = req.params.userId;
    try {
        const bitacora = await Bitacora.findAll({
            where: { userId },
            include: [{
                model: User,
                required: true
            }]
        })
        bitacora.length ?
            successMsg(res, 200, 'correcto', bitacora) :
            successMsg(res, 200, `No existen registros en la bitacora para el usuario de id ${userId}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================
//Obtener bitacora por modelo asociado
//======================================
async function getBitacoraByModel(req, res) {
    let modelName = req.params.modelName;
    try {
        const bitacora = await Bitacora.findAll({
            where: { modelName },
            include: [{
                model: User,
                required: true
            }]
        })
        bitacora.length ?
            successMsg(res, 200, 'correcto', bitacora) :
            successMsg(res, 200, `No existen registros en la bitacora para el modelo  ${modelName}`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================
//Obtener bitacora por fechas
//======================================
async function getBitacoraByDate(req, res) {
    let firstDate = req.body.firstDate;
    let secondDate = req.body.secondDate;

    if (firstDate > secondDate)
        return res.status(400).json({
            ok: true,
            message: `Error, fecha inicial debe ser menor o igual a fecha final`,
            firstDate
        });

    try {
        const bitacora = await Bitacora.findAll({
            where: {
                [Op.or]: [{
                    createdAt: {
                        [Op.gt]: firstDate,
                        [Op.lt]: secondDate
                    }
                }]
            },
            include: [{
                model: User,
                required: true
            }]
        })
        bitacora.length ?
            successMsg(res, 200, 'correcto', bitacora) :
            successMsg(res, 200, `No existen registros en la bitacora en las fechas indicadas`)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}
module.exports = {
    getBitacora,
    getBitacoraByUserId,
    getBitacoraByModel,
    getBitacoraByDate
}