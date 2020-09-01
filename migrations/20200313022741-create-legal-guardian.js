'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('LegalGuardians', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                allowNull: false,
                references: {
                    model: 'Patients',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            surname: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM('masculino', 'femenino'),
                allowNull:false
            },
            birthdate: {
                type: Sequelize.DATEONLY,
                allowNull:false
            },
            relationship: {
                type: Sequelize.STRING,
                allowNull:false
            },
                phoneNumber: {
                type: Sequelize.STRING
            },
                address: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('LegalGuardians');
    }
};