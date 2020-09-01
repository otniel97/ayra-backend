'use strict';

const EventDetail = require('../models').EventDetail
const ResultParameter = require('../models').ResultParameter

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ed = await EventDetail.findAll()
        const rp = await ResultParameter.findAll()

        return queryInterface.bulkInsert('EventResultParameters', [{
            eventDetailId: ed[0].id,
            resultParameterId: rp[0].id,
            minValue: 0,
            maxValue: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[0].id,
            resultParameterId: rp[1].id,
            minValue: 0,
            maxValue: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[1].id,
            resultParameterId: rp[0].id,
            minValue: 0,
            maxValue: 200,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[1].id,
            resultParameterId: rp[2].id,
            minValue: 0,
            maxValue: 200,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[2].id,
            resultParameterId: rp[2].id,
            minValue: 1,
            maxValue: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[2].id,
            resultParameterId: rp[3].id,
            minValue: 1,
            maxValue: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            resultParameterId: rp[3].id,
            minValue: 1,
            maxValue: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            resultParameterId: rp[1].id,
            minValue: 1,
            maxValue: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[4].id,
            resultParameterId: rp[3].id,
            minValue: 1,
            maxValue: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[4].id,
            resultParameterId: rp[0].id,
            minValue: 1,
            maxValue: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[5].id,
            resultParameterId: rp[3].id,
            minValue: 1,
            maxValue: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[6].id,
            resultParameterId: rp[1].id,
            minValue: 1,
            maxValue: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[6].id,
            resultParameterId: rp[2].id,
            minValue: 1,
            maxValue: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventResultParameters', null, {});
    }
};