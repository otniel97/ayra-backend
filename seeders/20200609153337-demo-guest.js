'use strict';

const EventDetail = require('../models').EventDetail

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const evt = await EventDetail.findAll()
    
    return queryInterface.bulkInsert('Guests', [{
      name: 'Andrés Pérez',
      description: 'Padre de paciente diabético Carlos Pérez',
      eventDetailId: evt[0].id,
      email: 'aperez@correo.com',
      phone: '0499-1122334',
      occupations: 'Abogado',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'María Rodríguez',
      description: 'Madre de paciente diabético Carlos Pérez',
      eventDetailId: evt[0].id,
      email: 'mrod@correo.com',
      phone: '0499-4455667',
      occupations: 'Médico',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Estephany Gómez',
      description: 'Madre de paciente diabético Valentina Suárez',
      eventDetailId: evt[0].id,
      email: 'estephanyg@correo.com',
      phone: '0499-7889901',
      occupations: 'Profesora',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Victor Delgado',
      description: 'Interesado en la actividad',
      eventDetailId: evt[0].id,
      email: 'victord@correo.com',
      phone: '0499-1345267',
      occupations: 'Periodista',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Carlos Pérez',
      description: 'Nuevo paciente diabético',
      eventDetailId: evt[2].id,
      email: 'carlitosperez@correo.com',
      phone: '0499-9876543',
      occupations: 'Estudiante',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Valentina Suárez',
      description: 'Nueva paciente diabética',
      eventDetailId: evt[2].id,
      email: 'vales@correo.com',
      phone: '0499-1234567',
      occupations: 'Estudiante',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Sebastián Cordero',
      description: 'Posible paciente interesado',
      eventDetailId: evt[2].id,
      email: 'secordero@correo.com',
      phone: '0499-5572999',
      occupations: 'Albañil',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Guests', null, {});
  }
};