'use strict';

const Event = require('../models').Event
const RatingType = require('../models').RatingType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ev = await Event.findAll()
        const rt = await RatingType.findAll()
        return queryInterface.bulkInsert('EventRatingTypes', [{
                eventId: ev[0].id,
                ratingTypeId: rt[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[0].id,
                ratingTypeId: rt[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[1].id,
                ratingTypeId: rt[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[1].id,
                ratingTypeId: rt[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[2].id,
                ratingTypeId: rt[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[2].id,
                ratingTypeId: rt[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[3].id,
                ratingTypeId: rt[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[3].id,
                ratingTypeId: rt[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[4].id,
                ratingTypeId: rt[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                eventId: ev[4].id,
                ratingTypeId: rt[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventRatingTypes', null, {});
    }
};