'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('ServiceTypes', [{
                name: 'Control rutinario',
                description: 'Servicios puntuales que el paciente recibe de manera periódica',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Nutrición',
                description: 'Servicios relacionados al área nutricional del paciente',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Medicina General',
                description: 'Servicios de atención con un médico general para el control de su salud',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Psicología',
                description: 'Servicios para el bienestar psicológico del paciente',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Endocrinología',
                description: 'Servicios en el área especializada de endocrinología',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cardiología',
                description: 'Servicios en el área especializada de cardiología',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Podología',
                description: 'Servicios en el área especializada de podología',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ServiceTypes', null, {});
    }
};