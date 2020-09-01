'use strict';
const PrePatient = require('../models').PrePatient
const Patient = require('../models').Patient
const People = require('../models').People
const Service = require('../models').Service
const AppointmentType = require('../models').AppointmentType
const Timetable = require('../models').Timetable

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const ppatient = await PrePatient.findAll()
        const patient = await Patient.findAll()
        const person = await People.findAll()
        const service = await Service.findAll()
        const atype = await AppointmentType.findAll()
        const ttable = await Timetable.findAll()

        return queryInterface.bulkInsert('Appointments', [{
            prePatientId: ppatient[0].id,
            patientId: patient[0].id,
            typeId: atype[0].id, //Inicial
            serviceId: service[1].id, //Consulta Médico general
            personId: person[4].id, // medico general
            date: '2020-04-13',
            description: 'Primera cita con el médico para convertirse en paciente',
            status: true,
            statusAppointment: 'completed',
            dayNumber: 1,
            qualified: false,
            timetableId: ttable[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[0].id,
            typeId: atype[1].id, //Rutinaria
            serviceId: service[1].id, //Consulta Médico General
            personId: person[4].id, // medico general
            date: '2020-04-21',
            description: 'Cita rutinaria con su médico general de cabecera',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 2,
            qualified: false,
            timetableId: ttable[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            prePatientId: ppatient[1].id,
            patientId: patient[1].id,
            typeId: atype[0].id, //Inicial
            serviceId: service[1].id, //Consulta Médico general
            personId: person[9].id, // medico general
            date: '2020-04-30',
            description: 'Primera cita con el médico para convertirse en paciente',
            status: true,
            statusAppointment: 'completed',
            dayNumber: 4,
            qualified: false,
            timetableId: ttable[6].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[1].id,
            typeId: atype[1].id, //Rutinaria
            serviceId: service[1].id, //Consulta general
            personId: person[9].id, // medico general
            date: '2020-05-07',
            description: 'Cita rutinaria con su médico general de cabecera',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 4,
            qualified: false,
            timetableId: ttable[6].id,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            prePatientId: ppatient[2].id,
            patientId: patient[2].id,
            typeId: atype[0].id, //Inicial
            serviceId: service[1].id, //Consulta Médico general
            personId: person[4].id, // medico general
            date: '2020-04-20',
            description: 'Primera cita con el médico para convertirse en paciente',
            status: true,
            statusAppointment: 'completed',
            dayNumber: 1,
            qualified: false,
            timetableId: ttable[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[2].id,
            typeId: atype[1].id, //Rutinaria
            serviceId: service[1].id, //Consulta Médico General
            personId: person[4].id, // medico general
            date: '2020-04-28',
            description: 'Cita rutinaria con su médico general de cabecera',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 2,
            qualified: false,
            timetableId: ttable[2].id,
            createdAt: new Date(),
            updatedAt: new Date()
        },
         {
            patientId: patient[0].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[3].id, //Consulta Endocrinologia
            personId: person[1].id, // Endocrinologo
            date: '2020-04-23',
            description: 'Cita eventual con médico endocrino',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 4,
            qualified: false,
            timetableId: ttable[6].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[0].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[2].id, //Consulta psicologo
            personId: person[3].id, // Psicologo
            date: '2020-04-24',
            description: 'Cita eventual con médico psicólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 5,
            qualified: false,
            timetableId: ttable[9].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[0].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[6].id, //Consulta cardiologo
            personId: person[14].id, // Cardiologo
            date: '2020-04-28',
            description: 'Cita eventual con médico cardiólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 2,
            qualified: false,
            timetableId: ttable[3].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[0].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[0].id, //Consulta nutricional
            personId: person[2].id, // Nutricionista
            date: '2020-04-29',
            description: 'Cita eventual con médico nutricionista',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 3,
            qualified: false,
            timetableId: ttable[5].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[1].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[3].id, //Consulta Endocrinologia
            personId: person[1].id, // Endocrinologo
            date: '2020-05-14',
            description: 'Cita eventual con médico endocrino',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 4,
            qualified: false,
            timetableId: ttable[6].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[1].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[2].id, //Consulta psicologo
            personId: person[3].id, // Psicologo
            date: '2020-05-15',
            description: 'Cita eventual con médico psicólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 5,
            qualified: false,
            timetableId: ttable[9].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[1].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[6].id, //Consulta cardiologo
            personId: person[14].id, // Cardiologo
            date: '2020-05-19',
            description: 'Cita eventual con médico cardiólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 2,
            qualified: false,
            timetableId: ttable[3].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[1].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[0].id, //Consulta nutricional
            personId: person[2].id, // Nutricionista
            date: '2020-05-20',
            description: 'Cita eventual con médico nutricionista',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 3,
            qualified: false,
            timetableId: ttable[5].id,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            patientId: patient[2].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[3].id, //Consulta Endocrinologia
            personId: person[1].id, // Endocrinologo
            date: '2020-04-30',
            description: 'Cita eventual con médico endocrino',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 4,
            qualified: false,
            timetableId: ttable[6].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[2].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[2].id, //Consulta psicologo
            personId: person[3].id, // Psicologo
            date: '2020-05-01',
            description: 'Cita eventual con médico psicólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 5,
            qualified: false,
            timetableId: ttable[9].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[2].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[6].id, //Consulta cardiologo
            personId: person[14].id, // Cardiologo
            date: '2020-05-05',
            description: 'Cita eventual con médico cardiólogo',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 2,
            qualified: false,
            timetableId: ttable[3].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            patientId: patient[2].id,
            typeId: atype[2].id, //Eventual
            serviceId: service[0].id, //Consulta nutricional
            personId: person[2].id, // Nutricionista
            date: '2020-05-06',
            description: 'Cita eventual con médico nutricionista',
            status: true,
            statusAppointment: 'pending',
            dayNumber: 3,
            qualified: false,
            timetableId: ttable[5].id,
            createdAt: new Date(),
            updatedAt: new Date()
        },], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Appointments', null, {});

    }
};