'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('AppointmentTypes', [{
            name: 'Inicial',
            description: 'Cita inicial para personas',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Rutinaria',
            description: 'Cita de control rutinaria del paciente',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Eventual',
            description: 'Cita eventual del paciente',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('AppointmentTypes', null, {});

    }
};