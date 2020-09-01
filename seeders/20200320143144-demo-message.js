'use strict';

const MessageType = require('../models').MessageType
const Organization = require('../models').Organization

module.exports = {
    up: async(queryInterface, Sequelize) => {
      const mtype = await MessageType.findAll()
      const org = await Organization.findAll()

      return queryInterface.bulkInsert('Messages', [{
        senderName: 'Pedro Pérez',
        senderEmail: 'pedroperez@correo.com',
        subject: 'Sugerencia',
        messageContent: 'Hacer más actividades recreacionales',
        phoneNumber: '555-123456',
        status: true,
        organizationId: org[0].id,
        typeId: mtype[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      } , {
        senderName: 'Juana Rodríguez',
        senderEmail: 'juanarodriguez@correo.com',
        subject: 'Duda',
        messageContent: 'Si me hago voluntaria, ¿debo asistir a todas las actividades obligatoriamente?',
        phoneNumber: '555-125544',
        status: false,
        organizationId: org[0].id,
        typeId: mtype[1].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Messages', null, {});
    
  }
};
