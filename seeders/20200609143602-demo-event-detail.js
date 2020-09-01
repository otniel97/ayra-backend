'use strict';

const Event = require('../models').Event

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const evt = await Event.findAll()

        return queryInterface.bulkInsert('EventDetails', [{
            name: 'Charla para padres 2019',
            description: 'Charla de concientización para padres de pacientes diabéticos, edición 2019',
            eventId: evt[0].id,
            statusDetail: 'created',
            plannedDate: '2019-05-30',
            time: '09:00:00',
            place: 'Sala de conferencias de la Fundación',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Charla para padres 2020',
            description: 'Charla de concientización para padres de pacientes diabéticos, edición 2020',
            eventId: evt[0].id,
            statusDetail: 'created',
            plannedDate: '2020-05-22',
            time: '09:00:00',
            place: 'Sala de usos comunes de la Fundación',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Introducción nuevos pacientes octubre 2020',
            description: 'Bienvenida y presentación de nuevos pacientes, corte octubre 2020',
            eventId: evt[1].id,
            statusDetail: 'created',
            plannedDate: '2020-10-11',
            time: '15:30:00',
            place: 'Sala de usos comunes de la Fundación',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Bingo bailable navidad 2019',
            description: 'Actividad recreativa para pacientes y familiares, diciembre 2019',
            eventId: evt[4].id,
            statusDetail: 'finished',
            plannedDate: '2019-12-14',
            time: '19:00:00',
            realDate: '2019-12-14',
            place: 'Salón de fiestas Colegio de Médicos',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Taller de nutrición',
            description: 'Taller para personas con diabetes con recetas y tips para la buena alimentación',
            eventId: evt[2].id,
            statusDetail: 'scheduled',
            plannedDate: '2020-08-12',
            time: '15:30:00',
            realDate: '2020-08-12',
            place: 'Sala de conferencias de la Fundación',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Noche de talentos',
            description: 'Evento para que los pacientes muestren sus habilidades y talentos a todo público',
            eventId: evt[2].id,
            statusDetail: 'scheduled',
            plannedDate: '2020-08-20',
            time: '19:00:00',
            realDate: '2020-08-12',
            place: 'Salón de fiestas Colegio de Médicos',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Bingo bailable julio 2020',
            description: 'Actividad recreativa para pacientes y familiares, julio 2020',
            eventId: evt[4].id,
            statusDetail: 'scheduled',
            plannedDate: '2020-07-31',
            time: '16:30:00',
            realDate: '2020-07-31',
            place: 'Salón de fiestas Colegio de Médicos',
            status: true,
            evaluation: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventDetails', null, {});
    }
};