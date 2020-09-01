'use strict';
const MedicalRecord = require('../models').MedicalRecord
const Appointment = require('../models').Appointment

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const mrecord = await MedicalRecord.findAll()
        const apoint = await Appointment.findAll()

        return queryInterface.bulkInsert('AppointmentHistories', [{
                appointmentId: apoint[0].id,
                medicalRecordId: mrecord[0].id,
                glucoseLevel: 155,
                height: 166,
                weight: 85,
                bloodPressureUp: 122,
                bloodPressureDown: 85,
                physicalExamination: 'Eco adbominal, Examen de Retina, Glucosa en ayunas, Glucosa post-pandrial',
                treatments: 'Medicamentos: Antidiabético, Anticoagulante, Estatina e Insulina. Fibra alimentaria, Asesoría nutricional y Dieta para diabéticos',
                medicalConditions: 'Retinopatía diabética: Perdida casi total de la vista, Nefropatía diabética: daño en riñones',
                description: 'Paciente de 40 años con daños avanzados causados por la diabetes, obesidad tipo I.',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                appointmentId: apoint[2].id,
                medicalRecordId: mrecord[1].id,
                glucoseLevel: 200,
                height: 160,
                weight: 65,
                bloodPressureUp: 120,
                bloodPressureDown: 60,
                physicalExamination: 'Eco adbominal, Examen de Retina, Glucosa en ayunas, Glucosa post-pandrial',
                treatments: 'Medicamentos: Antidiabético, Anticoagulante, Estatina e Insulina. Fibra alimentaria, Asesoría nutricional y Dieta para diabéticos',
                medicalConditions: 'Daño en riñones',
                description: 'Riesgo de convertirse en paciente renal, obesidad tipo II.',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                appointmentId: apoint[4].id,
                medicalRecordId: mrecord[2].id,
                glucoseLevel: 180,
                height: 170,
                weight: 75,
                bloodPressureUp: 110,
                bloodPressureDown: 70,
                physicalExamination: 'Eco adbominal, Examen de Retina, Glucosa en ayunas, Glucosa post-pandrial',
                treatments: 'Medicamentos: Antidiabético, Anticoagulante, Estatina e Insulina. Fibra alimentaria, Asesoría nutricional y Dieta para diabéticos',
                medicalConditions: 'Daños en la vista, pérdida de visión apresurada',
                description: 'Riesgo de convertirse padecer glaucoma, obesidad tipo I.',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('AppointmentHistories', null, {});

    }
};