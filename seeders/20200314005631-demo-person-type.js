'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('PersonTypes', [{
            name: 'Medico',
            description: 'Especialista en el área de la salud, posee una especialidad.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Voluntario',
            description: 'Colaborador en diversas actividades del centro de salud.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PersonTypes', null, {});
    }
};