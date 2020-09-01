// ====================================================
//      PEOPLE SERVICE
//      By ARYA Team ©
// ====================================================

const People = require('../models').People;
const models = require('../models');

//==============================
//Crear persona
//==============================
async function savePeople(req, res, user) {
    let body = req.body;

    let people = {
        name: body.name,
        surname: body.surname,
        gender: body.gender,
        birthdate: body.birthdate,
        phoneNumber: body.phoneNumber,
        address: body.address,
        cedula: body.cedula,
        rif: body.rif,
        description: body.description,
        userId: user.id,
        specialityId: body.specialityId,
        status: body.status || true,
    }

    await People.create(people)
        .then(person => {
            res.status(200).json({
                ok: true,
                message: 'Usuario y Persona creada con éxito',
                person
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Persona no creada, ha ocurrido un error',
                error: err.parent.detail
            });
        });;
}

async function getEventPeopleInvitations(req, res, userId) {
    await models.EventDetail.findAll({
            where: { statusDetail: ['scheduled', 'rescheduled'] },
            include: [{
                    required: false,
                    model: models.Post
                },
                {
                    required: true,
                    model: models.EventParticipant,
                    where: { userId },
                    include: [models.ParticipantType]
                }
            ]
        })
        .then(eventDetails => {
            if (eventDetails.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No tiene invitaciones a actividades actualmente.'
                })
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Correcto.',
                    eventDetails
                })
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
    savePeople,
    getEventPeopleInvitations
}