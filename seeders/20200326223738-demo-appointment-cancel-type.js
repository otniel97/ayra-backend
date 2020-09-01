'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('AppointmentCancelTypes', [{
            name: 'Retraso paciente',
            description: 'La cita fue cancelada porque el paciente no podía llegar a tiempo a la cita.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Eventualidad médico',
            description: 'La cita fue cancelada porque al médico se le presentó una situación que le impide llegar a la cita.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Disturbios',
            description: 'La cita fue cancelada por una situación irregular ajena al centro de salud, suspendiendo las actividades.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otros',
            description: 'La cita fue cancelada por otras circunstancias.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('AppointmentCancelTypes', null, {});
    }
};