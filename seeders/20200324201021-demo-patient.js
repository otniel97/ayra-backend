'use strict';
const User = require('../models').User

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const user = await User.findAll()

        return queryInterface.bulkInsert('Patients', [{
                name: 'Raul',
                surname: 'Ramos',
                gender: 'masculino',
                birthdate: '1980-03-14',
                phoneNumber: '215-654987',
                maritalStatus: 'soltero',
                address: 'Carrera 1 entre 7 y 8 Pueblo Nuevo, Barquisimeto',
                cedula: '14.555.222',
                rif: 'V145552223',
                userId: user[3].id,
                transaction: 3,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Estefany',
                surname: 'Martínez',
                gender: 'femenino',
                birthdate: '1970-04-21',
                phoneNumber: '424-5349809',
                maritalStatus: 'soltero',
                address: 'Carrera 21 entre 19 y 20, Barquisimeto',
                cedula: '10.245.212',
                rif: 'V102452123',
                userId: user[21].id,
                transaction: 3,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Francisco',
                surname: 'Gómez',
                gender: 'masculino',
                birthdate: '1950-01-02',
                phoneNumber: '424-5721232',
                maritalStatus: 'soltero',
                address: 'Carrera 21 entre 19 y 20, Barquisimeto',
                cedula: '4.945.212',
                rif: 'V49452128',
                userId: user[22].id,
                transaction: 3,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Patients', null, {});

    }
};