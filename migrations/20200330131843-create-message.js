'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            senderName: {
                type: Sequelize.STRING,
                allowNull: true
            },
            senderEmail: {
                type: Sequelize.STRING,
                allowNull: false
            },
            subject: {
                type: Sequelize.STRING,
                allowNull: true
            },
            messageContent: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            organizationId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Organizations',
                    key: 'id'
                }
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'MessageTypes',
                    key: 'id'
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            cancelId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'MessageCancelTypes',
                    key: 'id'
                }
            },
            canceled: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            attentionDate: {
                type: Sequelize.DATE,
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
        return queryInterface.dropTable('Messages');
    }
};