'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('PostTypes', [{
            name: 'Noticias',
            description: 'Noticias sobre diabetes',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades',
            description: 'Actividades y eventos que se realizan en la fundación',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('PostTypes', null, {});

    }
};