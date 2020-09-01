'use strict';
const People = require('../models').People
const Timetable = require('../models').Timetable

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const person = await People.findAll()
        const ttable = await Timetable.findAll()

        return queryInterface.bulkInsert('PersonTimetables', [{
                status: true,
                personId: person[0].id,
                timetableId: ttable[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[0].id,
                timetableId: ttable[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[0].id,
                timetableId: ttable[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[0].id,
                timetableId: ttable[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[1].id,
                timetableId: ttable[8].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[1].id,
                timetableId: ttable[10].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[1].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[2].id,
                timetableId: ttable[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[2].id,
                timetableId: ttable[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[2].id,
                timetableId: ttable[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[2].id,
                timetableId: ttable[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[3].id,
                timetableId: ttable[9].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[3].id,
                timetableId: ttable[11].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[3].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                personId: person[4].id,
                timetableId: ttable[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[4].id,
                timetableId: ttable[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[4].id,
                timetableId: ttable[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[5].id,
                timetableId: ttable[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[5].id,
                timetableId: ttable[8].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[5].id,
                timetableId: ttable[10].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[5].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[6].id,
                timetableId: ttable[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[6].id,
                timetableId: ttable[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[6].id,
                timetableId: ttable[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[6].id,
                timetableId: ttable[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[7].id,
                timetableId: ttable[9].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[7].id,
                timetableId: ttable[11].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[7].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                personId: person[8].id,
                timetableId: ttable[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[8].id,
                timetableId: ttable[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[8].id,
                timetableId: ttable[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[9].id,
                timetableId: ttable[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[9].id,
                timetableId: ttable[8].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[9].id,
                timetableId: ttable[10].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[9].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[10].id,
                timetableId: ttable[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[10].id,
                timetableId: ttable[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[10].id,
                timetableId: ttable[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[11].id,
                timetableId: ttable[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[11].id,
                timetableId: ttable[9].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[11].id,
                timetableId: ttable[11].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[11].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                personId: person[12].id,
                timetableId: ttable[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[13].id,
                timetableId: ttable[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[12].id,
                timetableId: ttable[8].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[13].id,
                timetableId: ttable[10].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[12].id,
                timetableId: ttable[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[13].id,
                timetableId: ttable[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[12].id,
                timetableId: ttable[11].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[13].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                personId: person[14].id,
                timetableId: ttable[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[7].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[9].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[11].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[14].id,
                timetableId: ttable[12].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                personId: person[15].id,
                timetableId: ttable[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[15].id,
                timetableId: ttable[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[15].id,
                timetableId: ttable[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[15].id,
                timetableId: ttable[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[15].id,
                timetableId: ttable[8].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                personId: person[15].id,
                timetableId: ttable[10].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('PersonTimetables', null, {});

    }
};