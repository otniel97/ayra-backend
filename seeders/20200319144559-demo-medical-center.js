'use strict';

const WebContent = require('../models').WebContent

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const web = await WebContent.findAll()
  
      return queryInterface.bulkInsert('MedicalCenters', [{
        name: 'Clinica IDB',
        description: 'Clinica privada',
        status: true,
        address: 'Carrera 19 esquina calle 34, Barquisimeto',
        addressUrl: 'www.idb.com.ve',
        phoneNumber:'555-888888',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }, {
        name: 'Ivss Dr. Rafael Vicente Andrade',
        description: 'Instituto Venezolano de Seguro Social, Sede Dr. Rafael Vicente Andrade, Seguro Público',
        status: true,
        address: 'Carrera 1 entre calles 4 y 5 de Barrio Unión, Barquisimeto',
        addressUrl: 'www.ivss.gob.ve',
        phoneNumber:'555-111111',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }, {
        name: 'Ivss Hospital Dr. Pastor Oropeza',
        description: 'Instituto Venezolano de Seguro Social, Sede Dr. Pastor Oropeza, Hospital Público',
        status: true,
        address: 'Av. La Salle, entre Av. Las Industrias y Av. Florencio Jiménez, Barquisimeto',
        addressUrl: 'www.ivss.gob.ve',
        phoneNumber:'555-222222',
        webId: web[0].id,
        createdAt:new Date(),
        updatedAt:new Date()  
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('MedicalCenters', null, {});
  
  }
};
