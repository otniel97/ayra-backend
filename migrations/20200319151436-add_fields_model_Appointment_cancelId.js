'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Appointments',
            'cancelId',
            Sequelize.INTEGER, {
                allowNull: true,
                references: {
                    model: 'AppointmentCancelType',
                    key: 'id'
                }
            })
    },

    down: (queryInterface, Sequelize) => {}
};