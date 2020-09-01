'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('MeasurementTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            lowerRank: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            upperRank: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            dangerLevel: {
                type: Sequelize.STRING,
                allowNull: false
            },
            upperMessage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            downMessage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            inRangeMessage: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('MeasurementTypes');
    }
};