'use strict';
const WebContent = require('../models').WebContent

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const web = await WebContent.findAll()

      return queryInterface.bulkInsert('Pharmacies', [{
        name: 'Nuevo Siglo Arca',
        description: 'Red de farmacias Nuevo Siglo',
        status: true,
        address: 'Av. 20 entre calles 29 y 30, Barquisimeto',
        addressUrl: 'www.farmaciasnuevosiglo.com.ve',
        phoneNumber:'444-123456',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      } , {
        name: 'Farmatodo de la 8',
        description: 'Red de farmacias Farmatodo',
        status: true,
        address: 'Av. 20 esquina calles 8, Barquisimeto',
        addressUrl: 'www.farmatodo.com.ve',
        phoneNumber:'222-12554',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      } , {
        name: 'San Ignacio del Recreo',
        description: 'Red de farmacias San Ingnacio',
        status: true,
        address: 'Av. Libertador, C.C. El Recreo, Barquisimeto',
        addressUrl: 'www.farmaciassanignacio.com.ve',
        phoneNumber:'333-778888',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Pharmacies', null, {});
    
  }
};
