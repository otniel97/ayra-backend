// ====================================================
//      Controlador: Upload and get files
//      By ARYA Team ©
// ====================================================

const validType = ['users', 'posts', 'organization', 'generalInformation', 'patients', 'web'];

let validExtentionImage = ['jpg', 'jpeg', 'png'];

let validExtentionPdf = ['pdf'];

let validExtentionApk = ['apk'];

let validExtention = ['png'];

const models = require('../models');

const fs = require('fs');

const path = require('path');

let noImagePath = path.resolve(__dirname, '../public/uploads/no-image.jpg');

let noImageUser = path.resolve(__dirname, '../public/uploads/user.png');

//=========================================
//Guardar archivos
//=========================================
let uploadFile = (req, res) => {

    let type = req.params.type;

    let id = req.params.id;

    let format = req.params.format;

    let fileUploaded = req.files.file; // El input de tener el name file

    if (validType.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Carga de ' + type + ' no permitida.',
                type: type
            }
        });
    }

    let nameTokenFile = fileUploaded.name.split('.');

    let extention = nameTokenFile[nameTokenFile.length - 1].toLowerCase();

    if (format === 'pdf')
        validExtention = validExtentionPdf;
    if (format === 'image')
        validExtention = validExtentionImage;
    if (format === 'apk')
        validExtention = validExtentionApk;

    if (validExtention.indexOf(extention) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones válidas son: ' + validExtention.join(', '),
                ext: extention
            }
        });
    }

    let fileName = `${id}-${ new Date().getMilliseconds() }.${ extention }`

    fileUploaded.mv(`public/uploads/${type}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        uploadByType(type, id, res, fileName, req);

    });

}

async function uploadByType(type, id, res, fileName, req) {
    switch (type) {
        case 'organization':
            await uploadOrganization(res, req, fileName, id);
        case 'generalInformation':
            await uploadGeneralInformation(res, fileName, id);
        case 'web':
            await uploadWebContent(res, req, fileName, id);
        case 'users':
            await uploadImageProfile(res, fileName, id);
        case 'posts':
            await uploadPost(res, fileName, id);
        default:
            break;
    }
}

//=========================================
//Guardar archivos de la organización
//=========================================
async function uploadOrganization(res, req, fileName, id) {
    let org;

    await models.Organization.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                deleteFile('organization', fileName);
                return res.status(200).json({
                    ok: false,
                    message: 'No hay organización con el id requerido',
                });
            } else {
                org = result;
                if (req.params.format === 'image') {
                    if (org.image !== '')
                        deleteFile('organization', org.image);
                    UploadImageOrg(id, fileName, res);
                }
                if (req.params.format === 'apk') {
                    if (org.apk !== '')
                        deleteFile('organization', org.apk);
                    UploadApkOrg(id, fileName, res);
                }
            }
        })
        .catch(err => {
            deleteFile('organization', fileName);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen de la organización
//=========================================
let UploadImageOrg = (id, fileName, res) => {
    models.Organization.update({ image: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar apk de la organización
//=========================================
let UploadApkOrg = (id, fileName, res) => {
    models.Organization.update({ apk: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Aplicación actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la aplicación`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen de información general
//=========================================
async function uploadGeneralInformation(res, fileName, id) {
    await models.GeneralInformation.update({ image: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Información general e Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar archivos de la web
//=========================================
async function uploadWebContent(res, req, fileName, id) {
    let web;

    await models.WebContent.findOne({ where: { id } })
        .then(async result => {
            if (result === null) {
                deleteFile('web', fileName);
                return res.status(200).json({
                    ok: false,
                    message: 'No hay contenido web con el id requerido',
                });
            } else {
                web = result;
                if (req.params.action === 'we') {
                    if (web.weImage !== '')
                        deleteFile('web', web.weImage);
                    await uploadImageWe(id, fileName, res);
                }
                if (req.params.action === 'download') {
                    if (web.downloadImage !== '')
                        deleteFile('web', web.downloadImage);
                    await uploadImageDownload(id, fileName, res);
                }
                if (req.params.action === 'main') {
                    if (web.mainImage !== '')
                        deleteFile('web', web.mainImage);
                    await uploadImageMain(id, fileName, res);
                }
                if (req.params.action === 'mission') {
                    if (web.missionImage !== '')
                        deleteFile('web', web.missionImage);
                    await uploadImageMission(id, fileName, res);
                }
                if (req.params.action === 'vision') {
                    if (web.visionImage !== '')
                        deleteFile('web', web.visionImage);
                    await uploadImageVision(id, fileName, res);
                }
                if (req.params.action === 'target') {
                    if (web.targetImage !== '')
                        deleteFile('web', web.targetImage);
                    await uploadImageTarget(id, fileName, res);
                }
            }
        })
        .catch(err => {
            deleteFile('web', fileName);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen NOSOTROS
//=========================================
async function uploadImageWe(id, fileName, res) {
    await models.WebContent.update({ weImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen DOWNLOAD
//=========================================
async function uploadImageDownload(id, fileName, res) {
    await models.WebContent.update({ downloadImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen MAIN
//=========================================
async function uploadImageMain(id, fileName, res) {
    await models.WebContent.update({ mainImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen MISSION
//=========================================
async function uploadImageMission(id, fileName, res) {
    await models.WebContent.update({ missionImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen VISION
//=========================================
async function uploadImageVision(id, fileName, res) {
    await models.WebContent.update({ visionImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen TARGET
//=========================================
async function uploadImageTarget(id, fileName, res) {
    await models.WebContent.update({ targetImage: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen perfil de usuario
//=========================================
async function uploadImageProfile(res, fileName, id) {
    await models.User.update({ profilePicture: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Guardar imagen de publicación
//=========================================
async function uploadPost(res, fileName, id) {
    await models.Post.update({ image: fileName }, { where: { id: id } })
        .then(data => {
            res.status(200).json({
                ok: true,
                message: 'Publicación e Imagen actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la imagen`,
                error: err.message
            });
        });
}

//=========================================
//Eliminar archivo
//=========================================
let deleteFile = (type, fileName) => {

    let pathImg = path.resolve(__dirname, `../public/uploads/${ type }/${ fileName }`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

//=========================================
//Obtener archivos
//=========================================
let getFile = (req, res) => {

    let type = req.params.type;
    let file = req.params.fileName;

    let pathImg = path.resolve(__dirname, `../public/uploads/${ type }/${ file }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        if (type == 'users' || type == 'patients') {
            res.sendFile(noImageUser);
        } else {
            res.sendFile(noImagePath);
        }

    }
}

module.exports = {
    uploadFile,
    deleteFile,
    getFile
}