'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('People', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gender: {
                type: Sequelize.ENUM('masculino', 'femenino'),
                allowNull: false
            },
            birthdate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cedula: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            rif: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            specialityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                allowNull: false,
                references: {
                    model: 'Specialities',
                    key: 'id'
                }
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
        return queryInterface.dropTable('People');
    }
};