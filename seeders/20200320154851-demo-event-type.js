'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('EventTypes', [{
        name: 'Charlas',
        description: 'Charlas informativas sobre la diabetes y cómo vivir con ella',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Talleres',
        description: 'Talleres de formación en áreas necesarias para tener mejor calidad de vida',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Recreativos',
        description: 'Actividades recreativas especiales para personas con diabetes',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('EventTypes', null, {});
    
  }
};
