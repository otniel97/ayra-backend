'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('RiskFactors', [{
            name: 'Sobrepeso',
            description: 'El paciente sufre de obesidad.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Fumador',
            description: 'El paciente posee vicio al cigarrillo o tabaco.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Hipertensión',
            description: 'El paciente es hipertenso.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Genético',
            description: 'El paciente posee familiares que padecen de diabetes.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Colesterol elevado',
            description: 'El paciente presenta altos niveles de colesterol en la sangre.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Ninguno',
            description: 'El paciente no presenta riesgos de salud.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otra',
            description: 'El paciente presenta un factor de riesgo no registrado.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('RiskFactors', null, {});
    }
};