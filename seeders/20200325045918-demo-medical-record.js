'use strict';
const Patient = require('../models').Patient
const DiabetesType = require('../models').DiabetesType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const patient = await Patient.findAll()
        const diabetes = await DiabetesType.findAll()

        return queryInterface.bulkInsert('MedicalRecords', [{
                bloodType: 'B+',
                personalBackground: 'Tuvo mala alimentación en su infancia, hacía muy poco ejercicio.',
                familyBackground: 'Su madre padece de diabetes tipo B',
                status: true,
                patientId: patient[0].id,
                createdAt: new Date(),
                updatedAt: new Date(),
                diabetesId: diabetes[1].id,
                amputated: false
            },
            {
                bloodType: 'O-',
                personalBackground: 'Tendencia al sedentarismo.',
                familyBackground: 'Su abuelo padece de diabetes tipo B y tiene familiares con cáncer',
                status: true,
                patientId: patient[1].id,
                createdAt: new Date(),
                updatedAt: new Date(),
                diabetesId: diabetes[1].id,
                amputated: true
            },
            {
                bloodType: 'O-',
                personalBackground: 'Fumador y consumidor de bédidas alcohólicas.',
                familyBackground: 'Familiares con diabetes tipo 2, cáncer, anemia y tensión alta',
                status: true,
                patientId: patient[2].id,
                createdAt: new Date(),
                updatedAt: new Date(),
                diabetesId: diabetes[0].id,
                amputated: false
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('MedicalRecords', null, {});
    }
};