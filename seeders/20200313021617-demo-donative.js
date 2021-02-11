'use strict';

const DonationType = require('../models').DonationType

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const dtype = await DonationType.findAll()

        return queryInterface.bulkInsert('Donatives', [{
            name: 'Insulina inyectable',
            description: 'Donativo de tipo Medicina',
            status: true,
            typeId: dtype[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Parche de insulina',
            description: 'Donativo de tipo Medicina',
            status: true,
            typeId: dtype[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Antihipertensivo',
            description: 'Donativo de tipo Medicina',
            status: true,
            typeId: dtype[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Antigripal',
            description: 'Donativo de tipo Medicina',
            status: true,
            typeId: dtype[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Medicamento para el colesterol alto',
            description: 'Donativo de tipo Medicina',
            status: true,
            typeId: dtype[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Jeringa',
            description: 'Donativo de tipo Material médico',
            status: true,
            typeId: dtype[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Mascarillas',
            description: 'Donativo de tipo Material médico',
            status: true,
            typeId: dtype[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Guantes de látex',
            description: 'Donativo de tipo Material médico',
            status: true,
            typeId: dtype[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tensiómetro',
            description: 'Donativo de tipo Material médico',
            status: true,
            typeId: dtype[1].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Resma de papel',
            description: 'Donativo de tipo Suministro de oficina',
            status: true,
            typeId: dtype[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Rollo de papel para impresora fiscal',
            description: 'Donativo de tipo Suministro de oficina',
            status: true,
            typeId: dtype[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Lapiceros',
            description: 'Donativo de tipo Suministro de oficina',
            status: true,
            typeId: dtype[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Carpetas con gancho',
            description: 'Donativo de tipo Suministro de oficina',
            status: true,
            typeId: dtype[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Donatives', null, {});
    }
};