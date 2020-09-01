'use strict';

const Service = require('../models').Service
const EventDetail = require('../models').EventDetail
const User = require('../models').User
const RatingType = require('../models').RatingType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const edt = await EventDetail.findAll()
        const ser = await Service.findAll()
        const user = await User.findAll()
        const rt = await RatingType.findAll()

        return queryInterface.bulkInsert('Ratings', [{
            serviceId: ser[0].id,
            userId: user[3].id,
            ratingTypeId: rt[7].id,
            stars: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            serviceId: ser[1].id,
            userId: user[3].id,
            ratingTypeId: rt[5].id,
            response: 'Excelente',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[0].id,
            userId: user[3].id,
            ratingTypeId: rt[0].id,
            stars: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: edt[0].id,
            userId: user[3].id,
            ratingTypeId: rt[1].id,
            stars: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Ratings', null, {});
    }
};