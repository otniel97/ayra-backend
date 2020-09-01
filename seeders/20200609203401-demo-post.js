'use strict';
const PostCategory = require('../models').PostCategory
const PostType = require('../models').PostType
const Organization = require('../models').Organization
const EventDetail = require('../models').EventDetail

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const pcat = await PostCategory.findAll()
        const ptype = await PostType.findAll()
        const org = await Organization.findAll()
        const edt = await EventDetail.findAll()

        return queryInterface.bulkInsert('Posts', [{
            title: 'Desarrollado el primer fármaco con el potencial de curar la diabetes tipo 1',
            content: 'Un fármaco nuevo, probado con éxito en ratones y en cultivos de células humanas, es capaz de revertir los síntomas y las causas de la diabetes tipo 1. Si se demuestra su eficacia y seguridad en ensayos clínicos, podría suponer una cura para la enfermedad. El logro, detallado hoy en Nature Communications, es de un equipo internacional de científicos encabezado por investigadores del Centro Andaluz de Biología Molecular y Medicina Regenerativa (Cabimer) de Sevilla. Ha llevado varios años identificar un receptor molecular adecuado que se pueda activar con un fármaco; ahora que lo han descrito, será posible diseñar varias moléculas sintéticas para dar con el medicamento idóneo.',
            author: 'Bruno Martín',
            image: 'image1.png',
            categoryId: pcat[0].id,
            postTypeId: ptype[0].id,
            organizationId: org[0].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Buena nutrición para el control de la diabetes',
            content: 'Es importante concientizar a nuestra población que ya padece sobrepeso y/o diabetes para que mejoren sus hábitos y se apeguen a su tratamiento con el fin de tener una mejor calidad de vida y reducir las complicaciones derivadas de la misma como: ataques cardíacos, accidentes cerebrovasculares, enfermedad renal, amputaciones, deterioro ó pérdida de la visión y daños neurológicos, entre otras. Alguien con diabetes debe abrirse a una selección variada de alimentos que puede y debe consumir en cantidades moderadas y apegarse a horarios regulares de comida.',
            author: 'Oscar Moreno',
            image: 'image2.png',
            categoryId: pcat[1].id,
            postTypeId: ptype[0].id,
            organizationId: org[0].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Taller de nutrición',
            content: 'Taller de nutrición para persona con diabetes, donde se realizaran recetas y tips para la buena alimentación de los pacientes y familiares',
            author: 'José Pérez',
            image: 'image3.png',
            categoryId: pcat[2].id,
            postTypeId: ptype[1].id,
            organizationId: org[0].id,
            eventDetailId: edt[4].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Actividad física para una buena salud y control de la diabetes',
            content: 'La actividad física es una de las formas de tratamiento de la diabetes. El programa de actividades debe estar orientado a controlar la glucemia, el mantenimiento del peso ideal, mejorar la calidad de vida y evitar la aparición de posibles complicaciones. Los ejercicios deben estar orientados al tipo diabetes del paciente, aunque los deportes más recomendados son caminar, correr y montar en bicicleta, es importante tener en cuenta el historial médico del paciente en todo momento, por eso es indispnesable llevar un registro de entrenamiento y consultar con el médico antes de realizar un ejercicio de forma continuada.',
            author: 'Pablo Jiménez',
            image: 'image7.jpg',
            categoryId: pcat[2].id,
            postTypeId: ptype[0].id,
            organizationId: org[0].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Noche de talentos',
            content: 'Evento organizado para que los pacientes de nuestra fundación puedan mostrar sus habilidades y talentos a sus familiares, amigos y público en general.',
            author: 'Jesús Hernández',
            image: 'image6.jpg',
            categoryId: pcat[3].id,
            postTypeId: ptype[1].id,
            organizationId: org[0].id,
            eventDetailId: edt[5].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Bingo bailable julio 2020',
            content: 'Actividad recreativa donde reunimos a pacientes y familiares para jugar bingo con intermedios de baile, en su edición julio 2020',
            author: 'Vanessa Rojas',
            image: 'image5.jpg',
            categoryId: pcat[3].id,
            postTypeId: ptype[1].id,
            organizationId: org[0].id,
            eventDetailId: edt[6].id,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Posts', null, {});

    }
};