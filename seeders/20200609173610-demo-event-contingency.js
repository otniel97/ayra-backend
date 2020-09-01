'use strict';

const EventDetail = require('../models').EventDetail
const EventCancelType = require('../models').EventCancelType


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ed = await EventDetail.findAll()
    const ect = await EventCancelType.findAll()
    
    return queryInterface.bulkInsert('EventContingencies', [{
      eventDetailId: ed[1].id,
      eventCancelId: ect[3].id,
      initialDate: '2020-05-22',
      initialTime: '09:00:00',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    } , {
      eventDetailId: ed[2].id,
      eventCancelId: ect[1].id,
      initialDate: '2019-10-11',
      initialTime: '15:30:00',
      status: true,
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventContingencies', null, {});
  }
};
