'use strict';

const WebContent = require('../models').WebContent

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const web = await WebContent.findAll()

        return queryInterface.bulkInsert('GeneralInformations', [{
            title: '¿Qué es la diabetes?',
            description: 'Enfermedad crónica e irreversible del metabolismo en la que se produce un exceso de glucosa o azúcar en la sangre y en la orina; es debida a una disminución de la secreción de la hormona insulina o a una deficiencia de su acción.',
            image: 'image1.jpg',
            status: true,
            webId: web[0].id,
            visibility: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Tipos más comunes de diabetes',
            description: 'diabetes tipo 2, diabetes mellitus tipo 1, prediabetes, diabetes mellitus gestacional',
            image: 'image2.jpg',
            status: true,
            webId: web[0].id,
            visibility: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: '¿Cuál es la causa de la diabetes?',
            description: 'La causa de la diabetes es una alteración en la producción o el funcionamiento de la insulina, hormona fabricada por el páncreas, que funciona como una llave facilitando el pasaje de la glucosa desde la sangre a los órganos y tejidos',
            image: 'image3.jpg',
            status: false,
            webId: web[0].id,
            visibility: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: '¿Cuál debe ser el vivel de glucosa en la sangre?',
            description: ' Normalmente, el nivel de glucosa en sangre se mantienen dentro de límites estrechos a lo largo del día ( 72-145 mg/dl; 4-8 mmol/l). Sin embargo, sube después de las comidas y es más bajo por la mañana antes del desayuno. Las personas con diabetes se caracterizan por tener niveles de glucosa más altos de lo normal.',
            image: 'image1.jpg',
            status: false,
            webId: web[0].id,
            visibility: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('GeneralInformations', null, {});

    }
};