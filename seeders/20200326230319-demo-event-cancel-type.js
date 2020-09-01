'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('EventCancelTypes', [{
            name: 'Condiciones climáticas',
            description: 'El evento fue cancelado porque las condiciones climáticas no eran favorables.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Eventualidad ponente',
            description: 'El evento fue cancelado por imposibilidad del ponente encargado de llegar al mismo.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Disturbios',
            description: 'El evento fue cancelado por una situación irregular ajena al centro de salud.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otro',
            description: 'El evento fue cancelado por otros motivos.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventCancelTypes', null, {});
    }
};