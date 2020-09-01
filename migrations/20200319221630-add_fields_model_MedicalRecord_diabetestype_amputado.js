'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'MedicalRecords',
            'diabetesId',
            Sequelize.INTEGER, {
                allowNull: false,
                references: {
                    model: 'DiabetesTypes',
                    key: 'id'
                }
            })
    },

    down: (queryInterface, Sequelize) => {

    }
};