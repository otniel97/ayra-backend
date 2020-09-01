'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('NotificationTypes', [{
                name: 'Nueva Cita',
                message: 'Cita médica nueva agendada. Revisa listado de citas pendientes',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Cita cancelada',
                message: 'Cita médica cancelada, revisa listado de citas canceladas',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Medir glucosa',
                message: 'Debe medir su nivel de glucosa',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nuevo mensaje',
                message: 'Mensaje nuevo recibido. Revisa listado de mensajes',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nueva solicitud',
                message: 'Solicitud nueva recibida. Revisa listado de solicitudes',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nueva solicitud de admisión',
                message: 'Solicitud de admisión de paciente recibida. Revisa listado de solicitudes de admisión',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nueva asignación de donación',
                message: 'Asignación de donación recibida. Revisa listado de donaciones recibidas',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nueva invitación a una actividad',
                message: 'Invitación a una actividad agendada. Revisa listado de actividades o tu agenda',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Actividad replanificada',
                message: 'Replanifiación de actividad. Revisa listado de actividades o tu agenda',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Actividad cancelada',
                message: 'Cancelación de actividad. Revisa listado de actividades o tu agenda',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mensaje respondido',
                message: 'Tienes un mensaje respondido. Revisa tus mensajes',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Solicitud respondida',
                message: 'Tienes un solicitud respondida. Revisa tus solicitudes',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Publicación nueva',
                message: 'Hay una nueva publicación en el blog.',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Actividad terminada, Calíficanos',
                message: 'Actividad terminada, Califícanos. Revisa listado de actividades o tu agenda',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Cita médica terminada, Calíficanos',
                message: 'Cita médica terminada, Califícanos. Revisa listado de citas terminadas',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('NotificationTypes', null, {});

    }
};