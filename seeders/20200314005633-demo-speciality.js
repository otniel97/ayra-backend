'use strict';
const PersonType = require('../models').PersonType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ptype = await PersonType.findAll()

        return queryInterface.bulkInsert('Specialities', [{
                name: 'Médico general',
                description: 'Médico general',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Endocrinólogo',
                description: 'Endocrinólogo',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Nutricionista',
                description: 'Nutricionista',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Psicólogo',
                description: 'Psicólogo',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Enfermero',
                description: 'Especialista de salud en enfermería.',
                status: true,
                personTypeId: ptype[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Secretario',
                description: 'Especialista en secretaria.',
                status: true,
                personTypeId: ptype[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Administrador',
                description: 'Especialista en administración.',
                status: true,
                personTypeId: ptype[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Internista',
                description: 'Internista',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cardiólogo',
                description: 'Cardiólogo',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Podólogo',
                description: 'Podólogo',
                status: true,
                personTypeId: ptype[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Specialities', null, {});
    }
};