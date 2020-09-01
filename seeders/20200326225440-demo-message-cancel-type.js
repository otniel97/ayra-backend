'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('MessageCancelTypes', [{
            name: 'Fuera de tópico',
            description: 'El mensaje no corresponde a ningún tema relacionado a la atención del centro.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Spam',
            description: 'El mensaje fue identificado como publicidad no deseada.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Cancelado por usuario',
            description: 'El usuario solicitó que no se atendiera la solicitud de su mensaje.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Otro',
            description: 'El mensaje fue cancelado por otros motivos.',
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('MessageCancelTypes', null, {});
    }
};