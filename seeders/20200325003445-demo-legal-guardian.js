'use strict';
const Patient = require('../models').Patient

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const patient = await Patient.findAll()
    
      return queryInterface.bulkInsert('LegalGuardians', [{
        patientId: patient[0].id,
        status: true,
        name: 'María',
        surname: 'De Ramos',
        gender: 'femenino',
        birthdate: '1988-05-30',
        relationship: 'Esposa',
        phoneNumber:'215-654987',
        address:'Carrera 1 entre 7 y 8 Pueblo Nuevo, Barquisimeto',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('LegalGuardians', null, {});
    
  }
};
