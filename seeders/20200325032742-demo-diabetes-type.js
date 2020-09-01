'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DiabetesTypes', [{
      name: 'Diabetes tipo 1',
      description: 'Células del páncreas dejan de funcionar, dejando de producir insulina.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Diabetes tipo 2',
      description: 'Resistencia a la insulina en el cuerpo.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Diabetes gestacional',
      description: 'Alto nivel de azúcar en la sangre durante el embarazo.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DiabetesTypes', null, {});
  }
};
