'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('IllnessDiagnoses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            illnessId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Illnesses',
                    key: 'id'
                }
            },
            appointmentHistoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'AppointmentHistories',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('IllnessDiagnoses');
    }
};