'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EventContingencies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            eventDetailId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'EventDetails',
                    key: 'id'
                }
            },
            eventCancelId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'EventCancelTypes',
                    key: 'id'
                }
            },
            initialDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            initialTime: {
                type: Sequelize.TIME,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
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
        return queryInterface.dropTable('EventContingencies');
    }
};