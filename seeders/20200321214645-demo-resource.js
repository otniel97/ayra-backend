'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Resources', [{
        name: 'Papeleria',
        description: 'Material de oficina necesario para la ejecución de la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Transporte',
        description: 'Vehículos para el transporte de material o personal al lugar de la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Refrigerios',
        description: 'Refrigerios para los participantes y personal a cargo de la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Equipo médico',
        description: 'Equipo médico que se utilizará en la actividad, en caso de ser necesario',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Resources', null, {});
    
  }
};
