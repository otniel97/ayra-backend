'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Organizations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            addressUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            mission: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            vission: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            values: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            objective: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            apkUrl: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            apk: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneTwo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rif: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            history: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            colorPrimary: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            colorSecondary: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            facebookUsername: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            instagramUsername: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            twitterUsername: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            linkedinUsername: {
                type: Sequelize.STRING,
                allowNull: true,
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
        return queryInterface.dropTable('Organizations');
    }
};