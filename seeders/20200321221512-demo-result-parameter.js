'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('ResultParameters', [{
        name: 'Asistencia',
        description: 'Cantidad de personas asistentes en la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Atención',
        description: 'Porcentaje de interés que demuestran los participantes en la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Participación',
        description: 'Porcentaje de participación de los asistentes en la actividad',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Calificación',
        description: 'Calificación que le dan los participantes a la actividad en un rango determinado',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('ResultParameters', null, {});
    
  }
};
