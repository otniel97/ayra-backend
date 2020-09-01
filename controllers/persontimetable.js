// ====================================================
//      Controller PersonTimetable
//      By ARYA Team ©
// ====================================================

const Person = require('../models').People;
const Timetable = require('../models').Timetable;
const PersonTimetable = require('../models').PersonTimetable;
const { saveBitacora } = require('../services/bitacora');

//======================================
//Agregar horarios a personas
//======================================
async function addTimetableToPerson(req, res) {

    //Buscar a la persona
    await Person.findOne({
            where: { id: req.body.personId }
        })
        .then(async person => {
            if (!person)
                return res.status(200).json({
                    ok: false,
                    message: 'Esta persona no existe.'
                });

            //array que guarda los personTimetable
            var personTimetableArray = [];

            //recorrer el arreglo timetables
            req.body.timetables.forEach((item) => {
                var newPersonTimetable = {
                    timetableId: item.id,
                    personId: person.id,
                    status: true
                }

                console.log(newPersonTimetable);
                personTimetableArray.push(newPersonTimetable);
            });
            console.log(personTimetableArray);

            //guardar las personTimetables
            await PersonTimetable.bulkCreate(personTimetableArray)
                .then(personTimetables => {
                    saveBitacora('PersonTimetable', person.id, person.name, 'add timetable to person', req.user.id);
                    return res.status(200).json({
                        ok: true,
                        message: 'Agregados horarios a la persona',
                        personTimetables
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        ok: false,
                        message: 'Ha ocurrido un error',
                        error: err.message
                    })
                });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Mostrar horarios de una persona
//======================================

async function getPersonTimetablesById(req, res) {
    let id = req.params.id;

    await Person.findOne({
            where: { id: id },
            include: Timetable
        })
        .then(async person => {
            if (!person)
                return res.status(200).json({
                    ok: false,
                    message: 'La persona no existe'
                });
            else {
                const timetables = await person.getTimetables();
                if (timetables.length === 0)
                    return res.status(200).json({
                        ok: false,
                        message: 'La persona no tiene horarios asociados.'
                    })
                else
                    return res.status(200).json({
                        ok: true,
                        message: 'Horarios asociadas a la persona',
                        person
                    });
            }
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Modificar horarios de persona
//======================================
async function updatePersonTimetable(req, res) {
    let body = req.body;
    let params = req.params;

    await Person.findOne({ where: { id: params.id } })
        .then(async person => {
            if (!person)
                return res.status(200).json({
                    ok: false,
                    message: 'La persona no existe'
                })
            else {
                //obtener todos los horarios de la persona
                const timetables = await person.getTimetables();

                if (timetables.length === 0)
                    return res.status(200).json({
                        ok: false,
                        message: 'La persona no tiene horarios asociados.'
                    })
                else {
                    //remover esos horarios
                    person.removeTimetables(timetables);
                    saveBitacora('PersonTimetable', person.id, person.name, 'remove timetable to person', req.user.id);

                    //array que guarda los timetables
                    var timetablesArray = [];

                    //recorrer el arreglo de timetables
                    req.body.timetables.forEach((item) => {
                        var newPersonTimetable = {
                            timetableId: item.id,
                            personId: person.id,
                            status: true
                        }
                        timetablesArray.push(newPersonTimetable);
                    });

                    console.log(timetablesArray);

                    //guardar las personTimetables
                    await PersonTimetable.bulkCreate(timetablesArray)
                        .then(personTimetables => {
                            saveBitacora('PersonTimetable', person.id, person.name, 'add timetable to person', req.user.id);
                            return res.status(200).json({
                                ok: true,
                                message: 'Agregados horarios a la persona',
                                personTimetables
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                ok: false,
                                message: 'Ha ocurrido un error',
                                error: err.message
                            })
                        });
                }
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}

//======================================
//Borrar horarios de una persona
//======================================

async function deletePersonTimetables(req, res) {
    let params = req.params;

    await Person.findOne({ where: { id: params.id } })
        .then(async person => {
            //obtener todos los horarios de una persona
            const timetables = await person.getTimetables();

            if (timetables.length === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'La persona no tiene horarios asociados.'
                });
            else {
                //remover esas funciones
                person.removeTimetables(timetables);
                saveBitacora('PersonTimetable', person.id, person.name, 'remove timetable to person', req.user.id);

                return res.status(200).json({
                    ok: true,
                    message: 'Todos los horarios se han eliminado de la persona',
                    person
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.parent.detail
            })
        });
}

//======================================
//Mostrar personas con todos sus horarios
//======================================
async function getPeopleTimetables(req, res) {
    await Person.findAll({
            include: [{
                model: Timetable
            }]
        })
        .then(people => {
            if (people === 0)
                return res.status(200).json({
                    ok: false,
                    message: 'No hay personas'
                });
            else
                return res.status(200).json({
                    ok: true,
                    message: 'Personas con sus horarios asociados',
                    people
                });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            })
        });
}


module.exports = {
    addTimetableToPerson,
    getPersonTimetablesById,
    updatePersonTimetable,
    deletePersonTimetables,
    getPeopleTimetables
}