'use strict';

const SystemFunction = require('../models').SystemFunction
const Role = require('../models').Role

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const sysfun = await SystemFunction.findAll()
        const rol = await Role.findAll()

        return queryInterface.bulkInsert('SystemFunctionRoles', [{
                status: true,
                systemFunctionId: sysfun[4].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[6].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[7].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[8].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[9].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[10].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[11].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[12].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[13].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[14].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[15].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[16].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[17].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[18].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[19].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[20].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[21].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[22].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[23].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[24].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[25].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[26].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[27].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[28].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[29].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[30].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[31].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[32].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[34].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[35].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[37].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[39].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[40].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[41].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[43].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[44].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[45].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[46].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[47].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[48].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[49].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[51].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[52].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[53].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[54].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[55].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[56].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[57].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[58].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[59].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[60].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[61].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[62].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[63].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[64].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[65].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[66].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[67].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[68].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[69].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[70].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[71].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[72].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[73].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[74].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[75].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[76].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[77].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[78].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[79].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[80].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[81].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[82].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[83].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[84].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[85].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[86].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[87].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[88].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[89].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[90].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[91].id,
                roleId: rol[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },


            {
                status: true,
                systemFunctionId: sysfun[4].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[6].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[7].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[8].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[9].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[10].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[11].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[12].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[13].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[14].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[15].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[16].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[17].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[18].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[19].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[20].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[21].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[22].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[23].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[24].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[25].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[26].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[27].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[28].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[29].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[30].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[31].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[32].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[34].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[35].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[37].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[39].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[40].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[41].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[43].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[44].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[45].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[46].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[47].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[48].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[49].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[51].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[52].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[53].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[54].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[55].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[56].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[57].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[58].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[59].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[60].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[61].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[62].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[63].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[64].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[65].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[66].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[67].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[68].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[69].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[70].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[71].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[72].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[73].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[74].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[75].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[76].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[77].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[78].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[79].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[80].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[81].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[82].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[83].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[84].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[85].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[86].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[87].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[88].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[89].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[90].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[91].id,
                roleId: rol[1].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },




            {
                status: true,
                systemFunctionId: sysfun[3].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[11].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[26].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[27].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[28].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[29].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[30].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[31].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[32].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[37].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[39].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[40].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[41].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[43].id,
                roleId: rol[2].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },




            {
                status: true,
                systemFunctionId: sysfun[1].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[14].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[15].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[16].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[17].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[18].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[19].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[47].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[48].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[49].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[3].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },



            {
                status: true,
                systemFunctionId: sysfun[2].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[11].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[13].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[20].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[21].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[22].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[23].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[24].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[25].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[46].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[4].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },


            {
                status: true,
                systemFunctionId: sysfun[3].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[13].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[5].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },


            {
                status: true,
                systemFunctionId: sysfun[3].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[5].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[12].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[13].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[33].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[36].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[37].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[38].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[39].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[40].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[41].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[42].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[43].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[44].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[45].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                status: true,
                systemFunctionId: sysfun[46].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                systemFunctionId: sysfun[50].id,
                roleId: rol[6].id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('SystemFunctionRoles', null, {});
    }
};