'use strict';

const EventDetail = require('../models').EventDetail
const ParticipantType = require('../models').ParticipantType
const User = require('../models').User

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ed = await EventDetail.findAll()
        const pt = await ParticipantType.findAll()
        const us = await User.findAll()

        return queryInterface.bulkInsert('EventParticipants', [{
            eventDetailId: ed[2].id,
            participantTypeId: pt[2].id,
            userId: us[3].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            participantTypeId: pt[2].id,
            userId: us[3].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[0].id,
            participantTypeId: pt[0].id,
            userId: us[1].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[1].id,
            participantTypeId: pt[0].id,
            userId: us[5].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[2].id,
            participantTypeId: pt[0].id,
            userId: us[4].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[2].id,
            participantTypeId: pt[1].id,
            userId: us[5].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            participantTypeId: pt[0].id,
            userId: us[4].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            participantTypeId: pt[2].id,
            userId: us[1].id,
            assistedEvent: false,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            participantTypeId: pt[2].id,
            userId: us[0].id,
            assistedEvent: true,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[3].id,
            participantTypeId: pt[2].id,
            userId: us[2].id,
            assistedEvent: false,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[4].id,
            participantTypeId: pt[0].id,
            userId: us[1].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[5].id,
            participantTypeId: pt[2].id,
            userId: us[11].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[6].id,
            participantTypeId: pt[0].id,
            userId: us[4].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            eventDetailId: ed[6].id,
            participantTypeId: pt[2].id,
            userId: us[12].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('EventParticipants', null, {});
    }
};