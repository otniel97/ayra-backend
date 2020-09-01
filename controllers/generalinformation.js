// ====================================================
//      Controller General Information
//      By ARYA Team ©
// ====================================================

const GeneralInformation = require('../models').GeneralInformation;

const Web = require('../models').WebContent;
const { uploadFile } = require('./upload');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas las información general
//======================================
async function getGeneralInformations(req, res) {
    await GeneralInformation.findAll({})
        .then(informations => {
            if (informations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay información general registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    informations
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

//==================================================
//Mostrar todas las información general por estatus
//==================================================
async function getGeneralInformationsByStatus(req, res) {
    let status = req.params.status;
    await GeneralInformation.findAll({ where: { status } })
        .then(informations => {
            if (informations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay información general registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    informations
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

//===================================
//Mostrar información general por id
//===================================
async function getGeneralInformationById(req, res) {
    let id = req.params.id;
    await GeneralInformation.findOne({ where: { id } })
        .then(information => {
            if (information === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay información general con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    information
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
//Crear información general
//==============================
async function saveGeneralInformation(req, res) {
    let body = req.body;

    let info = {
        title: body.title,
        description: body.description,
        status: body.status || true,
        visibility: body.visibility || false,
        webId: body.webId
    }

    await GeneralInformation.create(info)
        .then(async information => {
            saveBitacora('GeneralInformation', information.id, information.description, 'create', req.user.id);
            saveImage(req, res, information.id);
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Información general no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//================================
//Actualizar información general
//================================
async function updateGeneralInformation(req, res) {
    let id = req.params.id;

    await GeneralInformation.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('GeneralInformation', id, 'update Information', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Información general actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la información general con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la información general con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Eliminar información general por id
//=====================================
async function deleteGeneralInformation(req, res) {
    let id = req.params.id;

    await GeneralInformation.destroy({ where: { id: id } })
        .then(async data => {
            saveBitacora('GeneralInformation', id, 'delete Information', 'delete', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Información general eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la información general con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la información general con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=========================================
//Activar desactivar información general
//=========================================
async function statusGeneralInformation(req, res) {
    let id = req.params.id;

    await GeneralInformation.findOne({ where: { id } })
        .then(async info => {
            if (info === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay Información General con el id requerido',
                });
            } else {
                if (info.status) {
                    info.status = false;
                    info.visibility = false
                } else
                    info.status = true;

                await info.save();
                saveBitacora('GeneralInformation', info.id, info.title, 'update status', req.user.id);
                return res.status(200).json({
                    ok: true,
                    message: 'Información General actualizada con éxito',
                    info
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

//=========================================
//Subir imagen de la información general
//=========================================
async function saveImage(req, res, id) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'generalInformation';
    req.params.format = 'image';
    req.params.id = id;
    await uploadFile(req, res);
}

//============================================
//Actualizar imagen de la información general
//============================================
async function updateImage(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'generalInformation';
    req.params.format = 'image';
    saveBitacora('GeneralInformation', req.params.id, 'update image', 'update', req.user.id);
    uploadFile(req, res)

}

//=========================================
//Actualizar información visibles web page
//=========================================
async function updateVisibility(req, res) {
    let id = req.params.id;

    let web = await Web.findAll({})
    let quantity = web[0].maxGeneral;
    let informations = await GeneralInformation.findAll({ where: { visibility: true } })


    await GeneralInformation.findOne({ where: { id } })
        .then(async info => {
            if (info === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay información con el id requerido',
                });
            } else {
                if (info.visibility) {
                    info.visibility = false;
                    await info.save();
                    saveBitacora('GeneralInformation', info.id, info.title, 'update false visibility', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Información General actualizada con éxito',
                        info
                    });
                }
                if (informations.length < quantity) {
                    info.visibility = true;
                    info.status = true
                    await info.save();
                    saveBitacora('GeneralInformation', info.id, info.title, 'update true visibility', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Información General actualizada con éxito',
                        info
                    });
                } else {
                    return res.status(400).json({
                        ok: true,
                        message: `Límite de informaciones visibles, oculte uno. Solo pueden haber ${quantity} visibles. Actualice configuración de contenido web.`,
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

//====================================================
//Mostrar todas las información general visibles true
//====================================================
async function getGeneralInformationsByVisibility(req, res) {
    await GeneralInformation.findAll({ where: { visibility: true } })
        .then(informations => {
            if (informations.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay información general registradas con visibilidad activada`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    informations
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
    getGeneralInformations,
    getGeneralInformationsByStatus,
    getGeneralInformationById,
    saveGeneralInformation,
    updateGeneralInformation,
    deleteGeneralInformation,
    statusGeneralInformation,
    updateImage,
    updateVisibility,
    getGeneralInformationsByVisibility
}