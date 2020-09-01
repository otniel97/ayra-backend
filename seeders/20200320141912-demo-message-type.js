'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('MessageTypes', [{
                name: 'Sugerencia',
                description: 'Realizar sugerencia para mejora de servicios',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Reclamo',
                description: 'Si tiene algún reclamo sobre nuestra organización o su funcionamiento',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Duda',
                description: 'Si tiene alguna duda sobre nuestra organización o su funcionamiento',
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
                name: 'Otro',
                description: 'Realizar solicitud específica',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('MessageTypes', null, {});

    }
};