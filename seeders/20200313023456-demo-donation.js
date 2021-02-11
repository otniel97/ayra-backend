'use strict';

const Donative = require('../models').Donative

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const don = await Donative.findAll()

        return queryInterface.bulkInsert('Donations', [{
            name: 'Antonio',
            lastName: 'Gómez',
            email: 'agomez@correo.com',
            phone: '04192223344',
            description: 'Donó 10 cajas de medicamento para la presión arterial alta.',
            status: true,
            donativeId: don[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Laura',
            lastName: 'Suárez',
            email: 'lsuarez@correo.com',
            phone: '04195556677',
            description: 'Donó 2 inyecciones de insulina.',
            status: true,
            donativeId: don[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Marcos',
            lastName: 'Jiménez',
            email: 'mjimenez@correo.com',
            phone: '04199998877',
            description: 'Donó 20 jeringas subcutáneas desechables.',
            status: true,
            donativeId: don[5].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Rafael',
            lastName: 'Pereira',
            email: 'rpereira@correo.com',
            phone: '04193335599',
            description: 'Donó 1 tensiómetro.',
            status: true,
            donativeId: don[8].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Rosa',
            lastName: 'Alvarado',
            email: 'ralvarado@correo.com',
            phone: '04198886644',
            description: 'Donó 5 cajas de lapiceros.',
            status: true,
            donativeId: don[11].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Donations', null, {});
    }
};