'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('ParticipantTypes', [{
        name: 'Organizador',
        description: 'Organizador de la actividad o evento',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Responsable',
        description: 'Persona responsable de la actividad o evento',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Invitado',
        description: 'Invitado a participar en la actividad o evento',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Conductor',
        description: 'Encargado de manejar el vehículo a usarse para lo necesario en cuanto la realización de la actividad o evento',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('ParticipantTypes', null, {});
    
  }
};
