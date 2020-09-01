'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DonationTypes', [{
      name: 'Medicinas',
      description: 'Tipo de donacion que contempla todos los medicamentos de cualquier tipo',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Material medico',
      description: 'Insumos medicos desechables para uso de voluntarios, enfermeros y medicos',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Suministros de oficina',
      description: 'Todo material utilizado para elaboracion de recipes, invitaciones, facturas, etc.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DonationTypes', null, {});
  }
};
