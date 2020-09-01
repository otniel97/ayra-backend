'use strict';
const MedicalRecord = require('../models').MedicalRecord

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const mrecord = await MedicalRecord.findAll()

        return queryInterface.bulkInsert('EconomicStatuses', [{
                familyHead: 'María de Ramos',
                housing: 'Casa alquilada',
                insurance: false,
                monthlySalary: 2000000,
                familyMembers: 6,
                other: '',
                status: true,
                medicalRecordId: mrecord[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                familyHead: 'José Martínez',
                housing: 'Casa alquilada',
                insurance: false,
                monthlySalary: 2000000,
                familyMembers: 2,
                other: '',
                status: true,
                medicalRecordId: mrecord[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                familyHead: 'FranK Gómez',
                housing: 'Casa propia',
                insurance: false,
                monthlySalary: 2000000,
                familyMembers: 1,
                other: '',
                status: true,
                medicalRecordId: mrecord[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('EconomicStatuses', null, {});

    }
};