'use strict';

const NotificationType = require('../models').NotificationType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const nt = await NotificationType.findAll()
        return queryInterface.bulkInsert('Notifications', [{
                userId: 4,
                typeId: nt[6].id,
                model: 'donative new',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[11].id,
                model: 'request response',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[10].id,
                model: 'message response',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[12].id,
                model: 'publication new',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[0].id,
                model: 'appointment new',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[1].id,
                model: 'appointment cancel',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[2].id,
                model: 'glucose',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 17,
                typeId: nt[3].id,
                model: 'request new',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 17,
                typeId: nt[4].id,
                model: 'message new',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 17,
                typeId: nt[5].id,
                model: 'appointment admission',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[7].id,
                model: 'event scheduled',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[8].id,
                model: 'event rescheduled',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 4,
                typeId: nt[9].id,
                model: 'event cancel',
                status: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Notification', null, {});
    }
};