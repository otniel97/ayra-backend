// ====================================================
//      CRUD BASE SERVICE
//      By ARYA Team ©
// ====================================================

const { successMsg, errorMsg } = require('../utils/responses');

//==============================================
//Mostrar todas las items
//==============================================
async function getAll(req, res, model) {
    try {
        const data = await model.findAll()

        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, 'No existen datos registrados')

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todas las items por estatus
//==============================================
async function getAllByStatus(req, res, model) {
    const status = req.params.status;
    try {
        const data = await model.findAll({ where: { status } })

        data.length ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No hay datos registrados con el estatus ${status}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar item por id
//=================================
async function getItemById(req, res, model) {
    const id = req.params.id;
    try {
        const data = await model.findOne({ where: { id } })

        data
            ?
            successMsg(res, 200, 'correcto', data) :
            successMsg(res, 200, `No hay datos registrados con el id: ${id}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear objeto
//==============================
async function save(req, res, model) {
    const body = req.body;
    try {
        const data = await model.create({...body, status: true })

        const msg = data.name ?
            `${data.name} creado con exito` :
            'creación exitosa!'

        successMsg(res, 200, msg, data)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Lo sentimos!, hemos  cometido un error', error)
    }
}

//==============================
//Actualizar item
//==============================
async function updateById(req, res, model) {
    const id = req.params.id;
    try {
        const data = await model.findOne({ where: { id } })

        if (!data)
            successMsg(res, 200, `No se encontraron resultados para el id: ${id}.`)
        else {
            data.set({...req.body })
            await data.save()
            const msg = data.name ?
                `Se edito ${ data.name } con exito` :
                'Actualización de datos exitosa'

            successMsg(res, 200, msg, data)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=====================================
//Activar desactivar item
//=====================================
async function updateStatusById(req, res, model) {
    const id = req.params.id;
    try {
        const data = await model.findOne({ where: { id } })

        if (!data)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            data.set({ status: !data.status })
            await data.save()

            const msg = data.name ?
                `se actualizo el estatus de ${data.name}` :
                'actualización exitosa'

            successMsg(res, 200, msg, data)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==================================
//Eliminar item por id
//==================================
async function deleteById(req, res, model) {
    const id = req.params.id;
    try {
        const data = await model.destroy({ where: { id } })

        data === 1 ?
            successMsg(res, 200, 'item eliminado con éxito', data) :
            successMsg(res, 200, `No existe datos para el id: ${id}.`, )
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `No se pudo eliminar el item con id: ${id}.`)
    }
}

module.exports = {
    getAll,
    getAllByStatus,
    getItemById,
    save,
    updateById,
    deleteById,
    updateStatusById,
}