'use strict';

const Patient = require('../models').Patient
const Donative = require('../models').Donative

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const patient = await Patient.findAll()
    const donative = await Donative.findAll()

    return queryInterface.bulkInsert('AssignedDonatives', [{
      patientId: patient[0].id,
      donativeId: donative[5].id,
      assignationDate: '2019-08-20',
      description: 'Se asignó al paciente Raul Ramos 5 jeringas subcutáneas desechables.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      patientId: patient[0].id,
      donativeId: donative[0].id,
      assignationDate: '2019-11-16',
      description: 'Se asignó al paciente Raul Ramos 1 inyección de insulina.',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AssignedDonatives', null, {});
  }
};
