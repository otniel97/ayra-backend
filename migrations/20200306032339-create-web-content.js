'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('WebContents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            initialDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            weImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            weDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            serviceDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            interestDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            newsDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            eventsDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            downloadDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            downloadImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            voluntaryTitle: {
                type: Sequelize.STRING,
                allowNull: true
            },
            voluntaryMessage: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            voluntaryDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            donationTitle: {
                type: Sequelize.STRING,
                allowNull: true
            },
            donationMessage: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            donationDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            sitesTitle: {
                type: Sequelize.STRING,
                allowNull: true
            },
            sitesMessage: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            maxService: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            maxGeneral: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            mainImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            missionImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            visionImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            targetImage: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                allowNull: true
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
        return queryInterface.dropTable('WebContents');
    }
};