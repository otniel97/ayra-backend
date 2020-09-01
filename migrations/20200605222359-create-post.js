'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            author: {
                type: Sequelize.STRING,
                allowNull: true
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PostCategories',
                    key: 'id'
                }
            },
            postTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PostTypes',
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
            organizationId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Organizations',
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
        return queryInterface.dropTable('Posts');
    }
};