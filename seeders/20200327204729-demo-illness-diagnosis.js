'use strict';

const AppointmentHistory = require('../models').AppointmentHistory
const Illness = require('../models').Illness

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ahistory = await AppointmentHistory.findAll()
        const illness = await Illness.findAll()

        return queryInterface.bulkInsert('IllnessDiagnoses', [{
                status: true,
                illnessId: illness[0].id, //ojos
                appointmentHistoryId: ahistory[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                illnessId: illness[1].id, //riñones
                appointmentHistoryId: ahistory[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                illnessId: illness[0].id, //ojos
                appointmentHistoryId: ahistory[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                illnessId: illness[1].id, //riñones
                appointmentHistoryId: ahistory[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                illnessId: illness[0].id,
                appointmentHistoryId: ahistory[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                illnessId: illness[1].id,
                appointmentHistoryId: ahistory[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                illnessId: illness[0].id, //ojos
                appointmentHistoryId: ahistory[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('IllnessDiagnoses', null, {});

    }
};