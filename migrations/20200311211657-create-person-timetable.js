'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PersonTimetables', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: true
            },
            personId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'People',
                    key: 'id'
                }
            },
            timetableId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Timetables',
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
        return queryInterface.dropTable('PersonTimetables');
    }
};