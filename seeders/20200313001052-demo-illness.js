'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Illnesses', [{
            name: 'Retinopatía diabética',
            description: 'En los ojos, es posible que la sangre y otros fluidos goteen dentro de los tejidos circundantes desde los vasos sanguíneos lesionados y causen problemas de la vista,llegando incluso a quedar ciegos.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Nefropatía diabética',
            description: 'El riñón presenta daño y se acumula más proteína en la orina de lo normal.De manera progresiva se va destruyendo más parte del riñón y con el tiempo que puede llevar a insuficiencia renal crónica',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Úlceras diabéticas',
            description: 'Las úlceras en los pies son la razón más común de las hospitalizaciones para personas con diabetes. Pueden tardar semanas o incluso varios meses en sanar.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Neuropatía diabética',
            description: 'Trastorno de los nervios que conlleva adormecimiento y, algunas veces, genera dolor y debilidad en las manos, los brazos, los pies y las piernas.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Ninguno',
            description: 'El paciente no presenta enfermedades.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otra',
            description: 'El paciente presenta una enfermedad no registrada.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Illnesses', null, {});
    }
};