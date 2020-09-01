'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AppointmentHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            appointmentId: {
                type: Sequelize.INTEGER,
                unique: true,
                references: {
                    model: 'Appointments',
                    key: 'id'
                },
                allowNull: false,
            },
            medicalRecordId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'MedicalRecords',
                    key: 'id'
                },
            },
            glucoseLevel: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            height: {
                type: Sequelize.FLOAT(2),
                allowNull: false,
            },
            weight: {
                type: Sequelize.FLOAT(2),
                allowNull: false,
            },
            bloodPressureUp: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bloodPressureDown: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            physicalExamination: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            treatments: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            medicalConditions: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
        return queryInterface.dropTable('AppointmentHistories');
    }
};