// ====================================================
//      Controller Organization
//      By ARYA Team ©
// ====================================================

const Organization = require('../models').Organization;
const models = require('../models');

const { uploadFile } = require('./upload');
const { saveBitacora } = require('../services/bitacora');

//=================================
//Mostrar Organización
//=================================
async function getOrganization(req, res) {
    let id = req.params.id;
    await Organization.findOne({
            where: { id },
            include: [{
                    model: models.Faq,
                    as: 'faqs',
                    required: false
                },
                {
                    model: models.Service,
                    as: 'services',
                    required: false
                }
            ]
        })
        .then(organization => {
            if (organization === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay organización con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    organization
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
//Crear Organización
//==============================
async function saveOrganization(req, res) {
    let body = req.body;

    let organization = {
        name: body.name,
        description: body.description,
        status: body.status || true,
        address: body.address,
        addressUrl: body.addressUrl,
        mission: body.mission,
        vission: body.vission,
        values: body.values,
        objective: body.objective,
        phone: body.phone,
        phoneTwo: body.phoneTwo,
        email: body.email,
        rif: body.rif,
        history: body.history,
        colorPrimary: body.colorPrimary,
        colorSecondary: body.colorSecondary,
        facebookUsername: body.facebookUsername,
        instagramUsername: body.instagramUsername,
        twitterUsername: body.twitterUsername,
        linkedinUsername: body.linkedinUsername
    }

    await Organization.create(organization)
        .then(async organization => {
            saveBitacora('Organization', organization.id, organization.name, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Organización creada con éxito',
                organization
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Organización no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar organización
//==============================
async function updateOrganization(req, res) {
    let id = req.params.id;

    req.body.status = req.body.status || true

    await Organization.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Organization', id, 'update org', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Organización actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la organización con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la organización con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==============================
//Actualizar colores primarios
//==============================
async function updateOrganizationColor(req, res) {
    let id = req.params.id;

    colorPrimary = req.body.colorPrimary;
    colorSecondary = req.body.colorSecondary;

    await Organization.update({ colorPrimary, colorSecondary }, { where: { id: id } })
        .then(data => {
            if (data == 1) {
                saveBitacora('Organization', id, 'update colors', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Colores de la organización actualizados con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la organización con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar los colores de la organización con id = ${id}.`,
                error: err.message
            });
        });
}

//====================================
//Actualizar imagen de laorganización
//====================================
async function updateImage(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'organization';
    req.params.format = 'image';
    saveBitacora('Organization', req.params.id, 'update image', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Actualizar aplicación de la organización
//=========================================
async function updateApk(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'organization';
    req.params.format = 'apk';
    saveBitacora('Organization', req.params.id, 'update apk', 'update', req.user.id);
    await uploadFile(req, res)
}

//====================================
//Actualizar url de descarga apliación
//====================================
async function updateUrlDownloadApk(req, res) {
    let id = req.params.id;

    apkUrl = req.body.apkUrl;
    if (apkUrl === '') {
        res.status(400).json({
            ok: false,
            message: 'link de descarga vacío',
        });
    }
    await Organization.update({ apkUrl }, { where: { id: id } })
        .then(data => {
            if (data == 1) {
                saveBitacora('Organization', id, 'update url apk', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Link de descarga de aplicación actualizado con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la organización con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar link de descarga de aplicación de la organización con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getOrganization,
    saveOrganization,
    updateOrganization,
    updateOrganizationColor,
    updateImage,
    updateApk,
    updateUrlDownloadApk
}