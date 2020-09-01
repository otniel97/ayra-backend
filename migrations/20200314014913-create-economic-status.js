'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('EconomicStatuses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            familyHead: {
                type: Sequelize.STRING,
                allowNull: true
            },
            housing: {
                type: Sequelize.STRING,
                allowNull: true
            },
            insurance: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            monthlySalary: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            familyMembers: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            other: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            medicalRecordId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'MedicalRecords',
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
        return queryInterface.dropTable('EconomicStatuses');
    }
};