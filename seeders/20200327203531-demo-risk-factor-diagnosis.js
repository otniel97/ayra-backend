'use strict';
const AppointmentHistory = require('../models').AppointmentHistory
const RiskFactor = require('../models').RiskFactor

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ahistory = await AppointmentHistory.findAll()
        const rfactor = await RiskFactor.findAll()

        return queryInterface.bulkInsert('RiskFactorDiagnoses', [{
            status: true,
            riskFactorId: rfactor[0].id, //obesidad
            appointmentHistoryId: ahistory[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            status: true,
            riskFactorId: rfactor[3].id,
            appointmentHistoryId: ahistory[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            status: true,
            riskFactorId: rfactor[1].id,
            appointmentHistoryId: ahistory[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            status: true,
            riskFactorId: rfactor[2].id,
            appointmentHistoryId: ahistory[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            status: true,
            riskFactorId: rfactor[1].id,
            appointmentHistoryId: ahistory[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            status: true,
            riskFactorId: rfactor[2].id,
            appointmentHistoryId: ahistory[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('RiskFactorDiagnoses', null, {});

    }
};