'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Patients',
                    key: 'id'
                }
            },
            prePatientId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'PrePatients',
                    key: 'id'
                }
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'AppointmentTypes',
                    key: 'id'
                }
            },
            serviceId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Services',
                    key: 'id'
                }
            },
            personId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'People',
                    key: 'id'
                }
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            statusAppointment: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dayNumber: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            timetableId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Timetables',
                    key: 'id'
                }
            },
            qualified: {
                type: Sequelize.BOOLEAN,
                allowNull: true
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
        return queryInterface.dropTable('Appointments');
    }
};