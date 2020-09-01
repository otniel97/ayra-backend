'use strict';

const Organization = require('../models').Organization

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const org = await Organization.findAll()

        return queryInterface.bulkInsert('Faqs', [{
            question: '¿Qué tengo que hacer para convertirme en paciente de la fundación?',
            answer: 'Para empezar a disfrutar los beneficios del sistema, dirígete a la opción “SUSCRÍBETE” ubicada al inicio del portal.\nSe te redirigirá a un formulario inicial, en donde podrás ingresar tus datos para solicitar ser parte de la fundación. Al confirmar el envío, recibirás un correo en la dirección de correo electrónico ingresada para comunicarte si tu solicitud fue aprobada o rechazada.\nDe ser aprobada tu solicitud te llegará en el correo la fecha y hora de la cita para tu evaluación valoración.\n Al aceptarte como paciente podrás acceder al sistema, en donde tendrás la posibilidad de agendar las citas médicas y poder utilizar todos nuestros servicios.\nComienza ya',
            status: true,
            organizationId: org[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            question: '¿Qué servicios se ofrecen a los pacientes?',
            answer: 'Los pacientes pueden solicitar citas con un médico a través del sistema, permitiéndole visualizar su diagnóstico y la opinión profesional del médico posterior a la consulta. La aplicación también podrá sugerirle una nueva cita según las necesidades del paciente, mediante un calendario personalizado.\nTambién un paciente puede registrar su seguimiento diario de valores, junto a sus síntomas, y puede recibir ayuda de un especialista cuando alguno de los valores no está en los límites normales.\nEl paciente también tiene acceso a un canal de comunicación personalizado con la fundación, cuando necesite realizar alguna consulta o tenga un comentario con respecto a su patología.\nAdemás, los pacientes pueden acceder a actividades y eventos exclusivos de la fundación, solo para pacientes.',
            status: true,
            organizationId: org[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            question: 'Quiero ofrecerme como voluntario, ¿cómo puedo aplicar?',
            answer: '¡Agradecemos tu disposición a formar parte del equipo! En nuestra fundación impulsamos a estudiantes de medicina, representantes de organizaciones sin fines de lucro, profesionales y particulares que deseen apoyar en las actividades, diagnósticos, controles rutinarios y más.\nSi quieres aplicar como voluntario, dirígete a “Información de interés” para conocer más información al respecto, envía tu solicitud y una vez enviada serás atendido a la brevedad posible por un representante de Atención al Cliente, quien te guiará en tu proceso para inscribirte como voluntario.\nTe recomendamos que en primer lugar leas nuestra normativa, condiciones de servicio y demás regulaciones.',
            status: true,
            organizationId: org[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            question: '¿A dónde puedo dirigirme si necesito más información?',
            answer: 'Si tienes más dudas acerca de lafundación, puedes dirigirte a nuestra sección de Contacto  y encontrarás diversas formas en las que puedes comunicarte con nuestro equipo de Atención al Cliente, el cual estará encantado de atender tus consultas, en cualquier momento del día.',
            status: true,
            organizationId: org[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Faqs', null, {});
    }
};