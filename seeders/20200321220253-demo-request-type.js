'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('RequestTypes', [{
            name: 'Solicitud de actividad',
            description: 'Solicitud para realizar alguna actividad en específico',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Solicitud de medicamento o insumo médico',
            description: 'Solicitar a la fundación una medicina o insumo médico recibida como donación',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Solicitud para donación',
            description: 'Realizar solicitud para hacer donaciones a la fundación',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Solicitud para voluntario',
            description: 'Realizar solicitud para ser voluntario en la fundación',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otra',
            description: 'Realizar solicitud específica',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('RequestTypes', null, {});

    }
};