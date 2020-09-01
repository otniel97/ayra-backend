'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('PostCategories', [{
            name: 'Medicina',
            description: 'Medicinas para el tratamiento de la diabetes',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Nutrición',
            description: 'Alimentos adecuados para mantener bajos los niveles de azúcar',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Salud',
            description: 'Información general sobre la salud en personas diabeticas',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Recreación',
            description: 'Información de noticias y eventos recreativos ',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('PostCategories', null, {});

    }
};