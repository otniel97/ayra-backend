'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('RatingTypes', [{
            name: 'Atención en la actividad',
            description: '¿Cómo fue atendido en la actividad?',
            status: true,
            entity: 'actividades',
            scale: 'estrellas',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            name: 'Organización en la actividad',
            description: '¿Qué le pareció la organización de la actividad?',
            status: true,
            entity: 'actividades',
            scale: 'estrellas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Satisfacción en la actividad',
            description: '¿Quedo usted satisfecho con la actividad?',
            status: true,
            entity: 'actividades',
            scale: 'respuestas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Puntualidad en la actividad',
            description: '¿La actividad siguió el cronograma preestablecido?',
            status: true,
            entity: 'actividades',
            scale: 'respuestas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Atención en la cita',
            description: '¿Cómo fue atendido en la cita?',
            status: true,
            entity: 'citas',
            scale: 'respuestas',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            name: 'Organización en la cita',
            description: '¿Qué le pareció la organización de la cita?',
            status: true,
            entity: 'citas',
            scale: 'respuestas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Satisfacción en la cita',
            description: '¿Quedo usted satisfecho con la cita?',
            status: true,
            entity: 'citas',
            scale: 'estrellas',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Puntualidad en la cita',
            description: '¿La cita siguió el cronograma preestablecido?',
            status: true,
            entity: 'citas',
            scale: 'estrellas',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('RatingTypes', null, {});

    }
};