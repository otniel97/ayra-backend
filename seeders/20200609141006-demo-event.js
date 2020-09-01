'use strict';

const EventType = require('../models').EventType

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const et = await EventType.findAll()
    
    return queryInterface.bulkInsert('Events', [{
      name: 'Charla informativa para padres',
      topic: 'Padres',
      description: 'Actividad para concientizar a los padres de pacientes diabéticos sobre los tratamientos adecuados',
      eventTypeId: et[0].id,
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Introducción a la Fundación',
      topic: 'Generales',
      description: 'Charla de presentación sobre nuestra fundación a nuevos pacientes y público interesado',
      eventTypeId: et[0].id,
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Talleres de nutrición',
      topic: 'Nutrición',
      description: 'Taller para pacientes de la fundación en donde se explica como mejorar su alimentación',
      eventTypeId: et[1].id,
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Noche de talentos',
      topic: 'Recreación',
      description: 'Evento abierto al público donde los pacientes muestran sus habilidades y talentos',
      eventTypeId: et[2].id,
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      name: 'Bingo bailable',
      topic: 'Recreación',
      description: 'Reunimos a pacientes y familiares para jugar bingo con intermedios de baile',
      eventTypeId: et[2].id,
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
