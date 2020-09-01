'use strict';

const EventDetail = require('../models').EventDetail
const Resource = require('../models').Resource


module.exports = {
    up: async(queryInterface, Sequelize) => {
        const edt = await EventDetail.findAll()
        const rsc = await Resource.findAll()

        return queryInterface.bulkInsert('EventResources', [{
            eventDetailId: edt[0].id,
            resourceId: rsc[0].id,
            quantity: 100,
            description: 'Folletos informativos para los padres',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[0].id,
            resourceId: rsc[2].id,
            quantity: 100,
            description: 'Refrigerio para 100 personas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[1].id,
            resourceId: rsc[0].id,
            quantity: 200,
            description: 'Folletos informativos charla 2020',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[1].id,
            resourceId: rsc[2].id,
            quantity: 200,
            description: 'Refrigerio para 200 personas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[2].id,
            resourceId: rsc[0].id,
            quantity: 100,
            description: 'Copias del manual de la fundación para nuevos pacientes',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[3].id,
            resourceId: rsc[2].id,
            quantity: 500,
            description: 'Refrigerio para el bingo bailable',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[5].id,
            resourceId: rsc[2].id,
            quantity: 400,
            description: 'Refrigerio para la noche de talentos',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[6].id,
            resourceId: rsc[2].id,
            quantity: 500,
            description: 'Refrigerio para el bingo bailable',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventResources', null, {});
    }
};