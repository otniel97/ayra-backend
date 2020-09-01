'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EventParticipants', {
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
            participantTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ParticipantTypes',
                    key: 'id'
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            assistedEvent: {
                type: Sequelize.BOOLEAN,
                allowNull: true
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
        return queryInterface.dropTable('EventParticipants');
    }
};