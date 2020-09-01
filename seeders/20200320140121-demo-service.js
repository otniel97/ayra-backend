'use strict';

const Organization = require('../models').Organization
const ServiceType = require('../models').ServiceType
const Speciality = require('../models').Speciality

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const org = await Organization.findAll()
        const stype = await ServiceType.findAll()
        const spec = await Speciality.findAll()

        return queryInterface.bulkInsert('Services', [{
                name: 'Consulta Nutricional',
                description: 'Cita médica con un nutricionista para evaluar hábitos alimenticios y plan dietético',
                icon: 'mdi-plus-box',
                status: true,
                typeId: stype[1].id,
                specialityId: spec[2].id,
                visibility: true,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Consulta Médico general',
                description: 'Cita con un médico general para el control de la salud del paciente',
                icon: 'mdi-home-plus',
                status: true,
                typeId: stype[2].id,
                specialityId: spec[0].id,
                visibility: true,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Consulta Psicólogo',
                description: 'Atención personalizada con un psicólogo para el diagnóstico del bienestar mental',
                icon: 'mdi-book-open',
                status: true,
                typeId: stype[3].id,
                specialityId: spec[3].id,
                visibility: true,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Consulta Endocrinólogo',
                description: 'Cita médica en el área de endocrinología para control de valores dentro de intervalos normales',
                icon: 'mdi-plus-minus-box',
                status: true,
                typeId: stype[4].id,
                specialityId: spec[1].id,
                visibility: false,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Toma de tensión arterial',
                description: 'Toma de la tensión arterial de manera diaria, para un mejor seguimiento de tu salud',
                icon: 'mdi-equal-box',
                status: true,
                typeId: stype[0].id,
                specialityId: spec[0].id,
                visibility: false,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Aplicación de insulina',
                description: 'Se realiza una inyección de insulina para restablecer valores de insulina en el cuerpo',
                icon: 'mdi-home',
                status: true,
                typeId: stype[0].id,
                specialityId: spec[0].id,
                visibility: false,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Consulta Cardiología',
                description: 'Cita médica en el área de cardiología',
                icon: 'mdi-home-plus',
                status: true,
                typeId: stype[5].id,
                specialityId: spec[8].id,
                visibility: false,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Consulta Podología',
                description: 'Cita médica en el área de podología',
                icon: 'mdi-plus-minus-box',
                status: true,
                typeId: stype[6].id,
                specialityId: spec[9].id,
                visibility: false,
                organizationId: org[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Services', null, {});
    }
};