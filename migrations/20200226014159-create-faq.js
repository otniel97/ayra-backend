'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Faqs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            question: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            answer: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            organizationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        return queryInterface.dropTable('Faqs');
    }
};