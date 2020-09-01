'use strict';

const Role = require('../models').Role
const bcrypt = require('bcryptjs');

function crypt(myPassword) {
    return bcrypt.hashSync(myPassword, 10);
}

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const rol = await Role.findAll()

        return queryInterface.bulkInsert('Users', [{
                email: 'mariajimenez@correo.com',
                username: 'mjimenez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, //voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'josegonzalez@correo.com',
                username: 'jgonzalez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // médico
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'vanessarojas@correo.com',
                username: 'vrojas',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // médico
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'raulramos@correo.com',
                username: 'rramos',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[3].id, // paciente
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'jesushernandez@correo.com',
                username: 'jhernandez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'antoniotorres@correo.com',
                username: 'atorres',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // médico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'judithvallenilla@correo.com',
                username: 'judith',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, // voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'rgonzalez@correo.com',
                username: 'rgonzalez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'elizab@correo.com',
                username: 'borjase',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'moises2000@correo.com',
                username: 'moisesrod',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'luissuarez@correo.com',
                username: 'luissuarez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'vallenillamaria@correo.com',
                username: 'vallemaria',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, // voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'oddelsalazar@correo.com',
                username: 'oddels',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, // voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'sequeracarmen@correo.com',
                username: 'carmenseq',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, // voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'jesusbonilla@correo.com',
                username: 'jesusbonilla',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[5].id, // voluntario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'joelvalera@correo.com',
                username: 'joelvalera',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[0].id, // administrador
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'domingoperez@correo.com',
                username: 'domingo1001',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[0].id, // administrador
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'velazquezmaria@correo.com',
                username: 'mariav',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[1].id, // propietario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'robertorales@correo.com',
                username: 'rrosales',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[1].id, // propietario
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'mramirez@correo.com',
                username: 'mramirez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'jmartinez@correo.com',
                username: 'jmartinez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[4].id, // medico
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'estefany20@correo.com',
                username: 'estefany20',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[3].id, // paciente
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'frankgomez@correo.com',
                username: 'franciscogomez',
                password: crypt('arya1234'),
                profilePicture: '',
                notifications: true,
                mobileApp: true,
                lastLoginAt: new Date(),
                status: true,
                roleId: rol[3].id, // paciente
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Users', null, {});

    }
};