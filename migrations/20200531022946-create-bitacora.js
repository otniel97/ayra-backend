'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Bitacoras', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            modelName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            recordId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            recordName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            operation: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
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
        return queryInterface.dropTable('Bitacoras');
    }
};