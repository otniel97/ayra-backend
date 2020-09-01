// ====================================================
//      Controller Service Type
//      By ARYA Team ©
// ====================================================

const ServiceType = require('../models').ServiceType;
const models = require('../models');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los tipos de servicios
//======================================
async function getServiceTypes(req, res) {
    await ServiceType.findAll({})
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de servicio registrado',
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

//=================================================
//Mostrar todos los tipos de servicios por status
//=================================================
async function getServiceTypesByStatus(req, res) {
    let status = req.params.status;
    await ServiceType.findAll({ where: { status } })
        .then(types => {
            if (types.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de servicio registrado',
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
//Mostrar tipo de servicio por id
//=================================
async function getServiceTypeById(req, res) {
    let id = req.params.id;
    await ServiceType.findOne({
            where: { id },
            include: [{
                model: models.Service,
                as: 'services',
                required: false
            }]
        })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de servicio con el id requerido',
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
//Crear tipo de servicio
//==============================
async function saveServiceType(req, res) {
    let body = req.body;

    let type = {
        name: body.name,
        description: body.description,
        status: body.status
    }

    await ServiceType.create(type)
        .then(async type => {
            saveBitacora('ServiceType', type.id, type.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de servicio creado con éxito',
                type
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Tipo de servicio no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar tipo de servicio
//==============================
async function updateServiceType(req, res) {
    let id = req.params.id;

    await ServiceType.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('ServiceType', id, 'type update', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de servicio actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de servicio con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de servicio con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar tipo de servicio por id
//==================================
async function deleteServiceType(req, res) {
    let id = req.params.id;

    await ServiceType.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('ServiceType', id, 'type delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Tipo de servicio eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el tipo de servicio con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar el tipo de servicio con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar tipo de servicio
//=====================================
async function statusServiceType(req, res) {
    let id = req.params.id;

    let serviceType;
    await ServiceType.findOne({ where: { id } })
        .then(type => {
            if (type === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay tipo de servicio con el id requerido',
                });
            } else {
                serviceType = type;
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

    if (serviceType.status === true)
        change = false;

    await ServiceType.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('ServiceType', serviceType.id, serviceType.name, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Tipo de servicio actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el tipo de servicio con id = ${id}.`,
                error: err.message
            });
        });
}

//==========================================
//Mostrar servicios de un tipo de servicio
//==========================================
async function getServicesByType(req, res) {
    let typeId = req.params.typeId;
    await models.Service.findAll({ where: { typeId } })
        .then(services => {
            if (services.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay Servicios del tipo de servicio con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    services
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
    getServiceTypes,
    getServiceTypeById,
    getServiceTypesByStatus,
    saveServiceType,
    updateServiceType,
    deleteServiceType,
    statusServiceType,
    getServicesByType,
}