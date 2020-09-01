'use strict';
const MeasurementType = require('../models').MeasurementType
const Patient = require('../models').Patient

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const mtype = await MeasurementType.findAll()
    const patient = await Patient.findAll()

      return queryInterface.bulkInsert('GlucoseMeasurements', [{
        measurementTypeId: mtype[2].id,
        patientId: patient[0].id,
        status: true,
        result: 155,
        resultDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('GlucoseMeasurements', null, {});
   
  }
};
