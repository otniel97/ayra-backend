'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('PrePatients', [{
                name: 'Raul',
                surname: 'Ramos',
                email: 'raulramos@correo.com',
                gender: 'masculino',
                birthdate: '1980-03-14',
                phoneNumber: '215-654987',
                cedula: '14.555.222',
                description: 'Posible paciente diabetico',
                status: 'approved',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Estefany',
                surname: 'Martínez',
                email: 'estefany20@correo.com',
                gender: 'femenino',
                birthdate: '1970-04-21',
                phoneNumber: '424-5349809',
                cedula: '10.245.212',
                description: 'Posible paciente diabetico',
                status: 'approved',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Francisco',
                surname: 'Gómez',
                email: 'frankgomez@correo.com',
                gender: 'masculino',
                birthdate: '1950-01-02',
                phoneNumber: '424-5721232',
                cedula: '4.945.212',
                description: 'Posible paciente diabetico',
                status: 'approved',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Pedro',
                surname: 'Mollejas',
                email: 'pmollejas@correo.com',
                gender: 'masculino',
                birthdate: '1974-12-08',
                phoneNumber: '215-333333',
                cedula: '11.444.222',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Milagros',
                surname: 'Mendoza',
                email: 'mmendoza@correo.com',
                gender: 'femenino',
                birthdate: '1960-01-15',
                phoneNumber: '215-887995',
                cedula: '9.222.020',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Mildred',
                surname: 'Rivera',
                email: 'mrivera@correo.com',
                gender: 'femenino',
                birthdate: '1940-04-29',
                phoneNumber: '215-452136',
                cedula: '4.544.987',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'José',
                surname: 'Vázquez',
                email: 'jvazquez@correo.com',
                gender: 'masculino',
                birthdate: '1950-04-29',
                phoneNumber: '215-452136',
                cedula: '4.544.987',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Amarfi',
                surname: 'Valenzuela',
                email: 'avalenzuela@correo.com',
                gender: 'masculino',
                birthdate: '1960-04-29',
                phoneNumber: '215-452136',
                cedula: '8.544.987',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Américo',
                surname: 'Navarro',
                email: 'navarro@correo.com',
                gender: 'masculino',
                birthdate: '1940-09-29',
                phoneNumber: '215-452136',
                cedula: '1.544.987',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Maritza',
                surname: 'Riveros',
                email: 'maritzariveros@correo.com',
                gender: 'femenino',
                birthdate: '19650-09-29',
                phoneNumber: '215-452136',
                cedula: '10.544.987',
                description: 'Posible paciente diabetico',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('PrePatients', null, {});

    }
};