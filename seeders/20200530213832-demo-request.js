'use strict';

const User = require('../models').User
const EventType = require('../models').EventType
const RequestType = require('../models').RequestType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const us = await User.findAll()
        const et = await EventType.findAll()
        const rt = await RequestType.findAll()

        return queryInterface.bulkInsert('Requests', [{
            userId: us[5].id,
            activityTypeId: et[0].id,
            requestTypeId: rt[0].id,
            description: 'Requiero una charla para los familiares acerca de como es la vida para las personas diabéticas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: us[3].id,
            requestTypeId: rt[1].id,
            description: 'Solicito algunas inyecciones de insulina para uso de emergencia en mi casa',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Requests', null, {});

    }
};