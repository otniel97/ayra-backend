// ====================================================
//      Controller Service
//      By ARYA Team ©
// ====================================================

const ServiceType = require('../models').ServiceType;
const Web = require('../models').WebContent;
const Service = require('../models').Service;
const RatingType = require('../models').RatingType;
const ServiceRatingType = require('../models').ServiceRatingType;
const People = require('../models').People;
const Speciality = require('../models').Speciality;
const { successMsg, errorMsg } = require('../utils/responses');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los servicios
//======================================
async function getServices(req, res) {
    await Service.findAll({
            include: [{
                model: ServiceType,
                required: false,
            }, {
                model: Speciality,
                required: false,
            }, {
                model: RatingType,
                required: false,
            }]
        })
        .then(services => {
            if (services.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay servicios registrados',
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==========================================
//Mostrar todos los servicios por estatus
//==========================================
async function getServicesByStatus(req, res) {
    let status = req.params.status;
    await Service.findAll({
            where: { status },
            include: [{
                model: ServiceType,
                required: false,
            }, {
                model: Speciality,
                required: false,
            }, {
                model: RatingType,
                required: false,
            }]
        })
        .then(services => {
            if (services.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay servicios registrados con el estatus ${status}`,
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=================================
//Mostrar servicio por id
//=================================
async function getServiceById(req, res) {
    let id = req.params.id;
    await Service.findOne({
            where: { id },
            include: [{
                model: ServiceType,
                required: false,
            }, {
                model: Speciality,
                required: false,
            }, {
                model: RatingType,
                required: false,
            }]
        })
        .then(service => {
            if (service === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay servicios con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    service
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
//Crear servicio
//==============================
async function saveService(req, res) {
    let body = req.body;

    let serv = {
        name: body.name,
        description: body.description,
        icon: body.icon,
        status: body.status || true,
        visibility: body.visibility || false,
        typeId: body.typeId,
        specialityId: body.specialityId,
        organizationId: body.organizationId
    }
    try {
        const service = await Service.create(serv)
        saveBitacora('Service', service.id, service.description, 'create', req.user.id);
        req.params.id = service.id;
        var serviceRatingArray = [];
        body.RatingTypes.forEach((item) => {
            var result = {
                ratingTypeId: item.id,
                serviceId: service.id
            }
            serviceRatingArray.push(result);
        });
        const serviceRatingTypes = await ServiceRatingType.bulkCreate(serviceRatingArray)
        saveBitacora('ServiceRatingType', service.id, service.name, 'add rating type to service', req.user.id);

        serviceRatingTypes ?
            successMsg(res, 200, `Servicio ${service.name} creado exitosamente.`, service) :
            `Servicio ${service.name} creado exitosamente`

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error',
            error: err.message
        });
    }

}

//==============================
//Actualizar servicio
//==============================
async function updateService(req, res) {
    const id = req.params.id;
    try {
        const service = await Service.findOne({ where: { id } })

        if (!service)
            successMsg(res, 200, `No hay servicio registrado con el id: ${id}.`)
        else {
            service.set({...req.body })
            await service.save()
            saveBitacora('service', service.id, service.name, 'update', req.user.id);
            if (req.body.RatingTypes) {
                const serviceRatingTypes = await service.getRatingTypes();
                service.removeRatingTypes(serviceRatingTypes);
                var serviceRatingArray = [];
                req.body.RatingTypes.forEach((item) => {
                    var result = {
                        ratingTypeId: item.id,
                        serviceId: service.id
                    }
                    serviceRatingArray.push(result);
                });
                const types = await ServiceRatingType.bulkCreate(serviceRatingArray)
                saveBitacora('ServiceRatingType', service.id, service.name, 'add rating type to service', req.user.id);
            }
            service ?
                successMsg(res, 200, `Servicio ${service.name} actualizado exitosamente.`, service) :
                `Servicio ${service.name} actualizado exitosamente`
        }
    } catch (err) {
        console.error(error.toString())
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error',
            error: err.parent.detail
        });
    }
}

//==================================
//Eliminar servicio por id
//==================================
async function deleteService(req, res) {
    let id = req.params.id;

    await Service.destroy({ where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Service', id, 'service delete', 'delete', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Servicio eliminado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el servicio con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo eliminar el servicio con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar servicio
//=====================================
async function statusService(req, res) {
    let id = req.params.id;

    await Service.findOne({ where: { id } })
        .then(async serv => {
            if (serv === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay servicio con el id requerido',
                });
            } else {
                if (serv.status) {
                    serv.status = false;
                    serv.visibility = false
                } else
                    serv.status = true;

                await serv.save();
                saveBitacora('Service', serv.id, serv.name, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Servicio actualizado con éxito',
                    serv
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

//=======================================
//Actualizar servicios visibles web page
//=======================================
async function updateVisibility(req, res) {
    let id = req.params.id;

    let web = await Web.findAll({})
    let quantity = web[0].maxService;
    let services = await Service.findAll({ where: { visibility: true } })


    await Service.findOne({ where: { id } })
        .then(async serv => {
            if (serv === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay servicio con el id requerido',
                });
            } else {
                if (serv.visibility) {
                    serv.visibility = false;
                    await serv.save();

                    saveBitacora('Service', serv.id, serv.name, 'update false visibility', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Servicio actualizado con éxito',
                        serv
                    });
                }

                if (services.length < quantity) {
                    serv.visibility = true;
                    serv.status = true
                    await serv.save();

                    saveBitacora('Service', serv.id, serv.name, 'update true visibility', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Servicio actualizado con éxito',
                        serv
                    });
                } else {
                    return res.status(400).json({
                        ok: true,
                        message: `Límite de servicios visibles, oculte uno. Solo pueden haber ${quantity} servicios visibles. Actualice configuración de contenido web.`,
                    });
                }
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

async function getPeopleByServiceId(req, res) {
    let id = req.params.serviceId;

    let service = await Service.findOne({ where: { id } });
    if (!service) {
        res.status(400).json({
            ok: false,
            message: 'no existe el servicio'
        })
    }

    await People.findAll({
            where: { specialityId: service.specialityId },
            include: [{
                model: Speciality,
                required: false,
            }]
        })
        .then(people => {
            if (people.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay personas para atender el servicio seleccionado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    people
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

async function getServicesBySpecialtyId(req, res) {
    let specialityId = req.params.specialityId;

    await Service.findAll({
            where: { specialityId },
            include: [{
                model: Speciality,
                required: false,
            }]
        })
        .then(services => {
            if (services.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay servicios para la especialidad seleccionada',
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

async function getServicesVisibility(req, res) {
    await Service.findAll({
            where: { visibility: true },
            include: [{
                model: ServiceType,
                required: false,
            }, {
                model: Speciality,
                required: false,
            }]
        })
        .then(services => {
            if (services.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay servicios registrados con la visibilidad en true`,
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
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

module.exports = {
    getServices,
    getServicesByStatus,
    getServiceById,
    saveService,
    updateService,
    deleteService,
    statusService,
    updateVisibility,
    getPeopleByServiceId,
    getServicesBySpecialtyId,
    getServicesVisibility
}