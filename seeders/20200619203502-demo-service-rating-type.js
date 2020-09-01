'use strict';

const Service = require('../models').Service
const RatingType = require('../models').RatingType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const sr = await Service.findAll()
        const rt = await RatingType.findAll()
        return queryInterface.bulkInsert('ServiceRatingTypes', [{
                serviceId: sr[0].id,
                ratingTypeId: rt[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[0].id,
                ratingTypeId: rt[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[1].id,
                ratingTypeId: rt[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[1].id,
                ratingTypeId: rt[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[2].id,
                ratingTypeId: rt[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[2].id,
                ratingTypeId: rt[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[3].id,
                ratingTypeId: rt[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[3].id,
                ratingTypeId: rt[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[4].id,
                ratingTypeId: rt[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[4].id,
                ratingTypeId: rt[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[5].id,
                ratingTypeId: rt[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                serviceId: sr[5].id,
                ratingTypeId: rt[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ServiceRatingTypes', null, {});
    }
};