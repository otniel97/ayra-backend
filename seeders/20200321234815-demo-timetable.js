'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Timetables', [{
            description: 'Lunes turno de la mañana',
            status: true,
            day: 'Lunes',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 1,
            maxPatients: 4
        }, {
            description: 'Lunes turno en la tarde',
            status: true,
            day: 'Lunes',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 1,
            maxPatients: 4
        }, {
            description: 'Martes turno de la mañana',
            status: true,
            day: 'Martes',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 2,
            maxPatients: 4
        }, {
            description: 'Martes turno en la tarde',
            status: true,
            day: 'Martes',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 2,
            maxPatients: 4
        }, {
            description: 'Miércoles turno de la mañana',
            status: true,
            day: 'Miércoles',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 3,
            maxPatients: 4
        }, {
            description: 'Miércoles turno en la tarde',
            status: true,
            day: 'Miércoles',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 3,
            maxPatients: 4
        }, {
            description: 'Jueves turno de la mañana',
            status: true,
            day: 'Jueves',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 4,
            maxPatients: 4
        }, {
            description: 'Jueves turno en la tarde',
            status: true,
            day: 'Jueves',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 4,
            maxPatients: 4
        }, {
            description: 'Viernes turno de la mañana',
            status: true,
            day: 'Viernes',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 5,
            maxPatients: 4
        }, {
            description: 'Viernes turno en la tarde',
            status: true,
            day: 'Viernes',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 5,
            maxPatients: 4
        }, {
            description: 'Sábado turno de la mañana',
            status: true,
            day: 'Sábado',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 6,
            maxPatients: 4
        }, {
            description: 'Sábado turno en la tarde',
            status: true,
            day: 'Sábado',
            timeStart: '14:00:00',
            timeEnd: '18:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 6,
            maxPatients: 4
        }, {
            description: 'Domingo turno de la mañana',
            status: true,
            day: 'Domingo',
            timeStart: '08:00:00',
            timeEnd: '12:00:00',
            createdAt: new Date(),
            updatedAt: new Date(),
            dayNumber: 7,
            maxPatients: 4
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Timetables', null, {});

    }
};