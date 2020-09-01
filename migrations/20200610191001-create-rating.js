'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Ratings', {
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
            serviceId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Services',
                    key: 'id'
                }
            },
            eventDetailId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'EventDetails',
                    key: 'id'
                }
            },
            ratingTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'RatingTypes',
                    key: 'id'
                }
            },
            stars: {
                type: Sequelize.INTEGER,
                allowNull: true
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
        return queryInterface.dropTable('Ratings');
    }
};