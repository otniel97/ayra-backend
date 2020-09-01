'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EventResultParameters', {
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
            resultParameterId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ResultParameters',
                    key: 'id'
                }
            },
            minValue: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            maxValue: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            realValue: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('EventResultParameters');
    }
};