'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Requests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            activityTypeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'EventTypes',
                    key: 'id'
                }
            },
            requestTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'RequestTypes',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            response: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('Requests');
    }
};