// ====================================================
//      Controller webContent
//      By ARYA Team ©
// ====================================================

const Web = require('../models').WebContent;
const models = require('../models');

const { uploadFile } = require('./upload');
const { saveBitacora } = require('../services/bitacora');

//=================================
//Mostrar Web
//=================================
async function getWeb(req, res) {
    let id = req.params.id;
    await Web.findOne({
            where: { id },
            include: [{
                    model: models.MedicalCenter,
                    as: 'medicalCenters',
                    required: false,
                },
                {
                    model: models.Pharmacy,
                    as: 'pharmacies',
                    required: false,
                },
                {
                    model: models.GeneralInformation,
                    as: 'generalInformations',
                    required: false,
                }
            ]
        })
        .then(web => {
            if (web === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay web con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    web
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
//Crear Web
//==============================
async function saveWeb(req, res) {
    let body = req.body;

    let web = {
        initialDescription: body.initialDescription,
        weDescription: body.weDescription,
        serviceDescription: body.serviceDescription,
        interestDescription: body.interestDescription,
        newsDescription: body.newsDescription,
        eventsDescription: body.eventsDescription,
        downloadDescription: body.downloadDescription,
        voluntaryTitle: body.voluntaryTitle,
        voluntaryMessage: body.voluntaryMessage,
        voluntaryDescription: body.voluntaryDescription,
        donationTitle: body.donationTitle,
        donationMessage: body.donationMessage,
        donationDescription: body.donationDescription,
        sitesTitle: body.sitesTitle,
        sitesMessage: body.sitesMessage,
        sitesDescription: body.sitesDescription,
        maxService: body.maxService || 3,
        maxGeneral: body.maxGeneral || 3
    }

    await Web.create(web)
        .then(async webContent => {
            saveBitacora('WebContent', webContent.id, webContent.initialDescription, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Contenido web creado con éxito',
                webContent
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Contenido web no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar web
//==============================
async function updateWeb(req, res) {
    let id = req.params.id;

    req.body.status = req.body.status || true

    await Web.update(req.body, { where: { id: id } })
        .then(async data => {
            saveBitacora('WebContent', id, 'webContent update', 'update', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Contenido web actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el Contenido web con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el Contenido web con id = ${id}.`,
                error: err.parent.detail
            });
        });
}


//====================================
//Actualizar imagen NOSOTROS
//====================================
async function updateImageWe(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'we';
    saveBitacora('WebContent', req.params.id, 'image we', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar imagen descarga
//=========================================
async function updateImageDownload(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'download';
    saveBitacora('WebContent', req.params.id, 'image download', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar imagen principal
//=========================================
async function updateImageMain(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'main';
    saveBitacora('WebContent', req.params.id, 'image main', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar imagen de sección Misión
//=========================================
async function updateImageMission(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'mission';
    saveBitacora('WebContent', req.params.id, 'image mission', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar imagen de sección Visión
//=========================================
async function updateImageVision(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'vision';
    saveBitacora('WebContent', req.params.id, 'image vision', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar imagen de sección Objetivo
//=========================================
async function updateImageTarget(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'web';
    req.params.format = 'image';
    req.params.action = 'target';
    saveBitacora('WebContent', req.params.id, 'image target', 'update', req.user.id);
    await uploadFile(req, res)
}

module.exports = {
    getWeb,
    saveWeb,
    updateWeb,
    updateImageWe,
    updateImageDownload,
    updateImageMain,
    updateImageMission,
    updateImageVision,
    updateImageTarget
}