// ====================================================
//      Controller Faq
//      By ARYA Team ©
// ====================================================

const Faq = require('../models').Faq;
const Organization = require('../models').Organization;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todas preguntas
//======================================
async function getFaqs(req, res) {
    await Faq.findAll({
            include: [{ model: Organization, required: true }]
        })
        .then(faqs => {
            if (faqs.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay preguntas registradas',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    faqs
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

//==============================================
//Mostrar todas las preguntas por estatus
//==============================================
async function getFaqsByStatus(req, res) {
    let status = req.params.status;
    await Faq.findAll({ where: { status }, include: [{ model: Organization, required: true }] })
        .then(faqs => {
            if (faqs.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay preguntas registradas con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    faqs
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
//Mostrar pregunta por id
//=================================
async function getFaqById(req, res) {
    let id = req.params.id;
    await Faq.findOne({ where: { id }, include: [{ model: Organization, required: true }] })
        .then(faq => {
            if (faq === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pregunta con el id requerido',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    faq
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
//Crear pregunta
//==============================
async function saveFaq(req, res) {
    let body = req.body;

    let faq = {
        question: body.question,
        answer: body.answer,
        status: body.status || true,
        organizationId: body.organizationId
    }

    await Faq.create(faq)
        .then(async faqs => {
            saveBitacora('Faq', faqs.id, faqs.question, 'create', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Pregunta creada con éxito',
                faqs
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Pregunta no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

//==============================
//Actualizar pregunta
//==============================
async function updateFaq(req, res) {
    let id = req.params.id;

    await Faq.update(req.body, { where: { id: id } })
        .then(async data => {
            if (data == 1) {
                saveBitacora('Faq', id, 'update faq', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Pregunta actualizada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la pregunta con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la pregunta con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//==================================
//Eliminar pregunta por id
//==================================
async function deleteFaq(req, res) {
    let id = req.params.id;

    await Faq.destroy({ where: { id: id } })
        .then(async data => {
            saveBitacora('Faq', id, 'delete faq', 'delete', req.user.id);
            if (data == 1) {
                res.status(200).json({
                    ok: true,
                    message: 'Pregunta eliminada con éxito',
                    data
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe la pregunta con id = ${id}.`
                });
            }
        })
        .catch(err => {
            rres.status(500).json({
                ok: false,
                message: `No se pudo eliminar la pregunta con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar pregunta
//=====================================
async function statusFaq(req, res) {
    let id = req.params.id;

    let faq;
    await Faq.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay pregunta con el id requerido',
                });
            } else {
                faq = result;
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

    if (faq.status === true)
        change = false;

    await Faq.update({ status: change }, { where: { id: id } })
        .then(async data => {
            saveBitacora('Faq', faq.id, faq.question, 'update status', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Pregunta actualizada con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar la pregunta con id = ${id}.`,
                error: err.message
            });
        });
}

module.exports = {
    getFaqs,
    getFaqsByStatus,
    getFaqById,
    saveFaq,
    updateFaq,
    deleteFaq,
    statusFaq,
}