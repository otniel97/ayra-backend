// ====================================================
//      BITACORA SERVICE
//      By ARYA Team ©
// ====================================================

const Bitacora = require('../models').Bitacora;

//======================================
//Crear registro en bitacora
//======================================
async function saveBitacora(modelName, recordId, recordName, operation, userId) {

    let action = {
        modelName,
        recordId,
        recordName,
        operation,
        userId,
        date: new Date()
    }
    await Bitacora.create(action);

}

module.exports = {
    saveBitacora
}