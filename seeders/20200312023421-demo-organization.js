'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Organizations', [{
            name: 'Fundación Marjorie',
            description: 'Somos una fundación dedicada al tratamiento y atención de pacientes diabéticos, facilitando su control de citas médicas, manejo del expediente, seguimiento general de sus valores físicos, y otros cuidados pertinentes.',
            status: true,
            address: 'Calle 1 entre carreras 2 y 3, Los Pinos, Nueva Venezuela',
            addressUrl: 'www.fundamarjorie.com',
            mission: 'Ofrecer atención inmediata a pacientes diabéticos mediante un equipo multidisciplinario de expertos dedicado a atender continuamente las necesidades del paciente, para mejorar su calidad de vida.',
            vission: 'Ser el centro de salud de mayor renombre en toda la comunidad de Los Pinos, convirtiendo el nombre de la fundación en un estandarte de confianza y calidad de servicio.',
            values: 'Los valores de nuestra organización son el compromiso, confianza, sentido de pertenencia, amabilidad, solidaridad, inmediatez, seriedad, responsabilidad y trabajo en equipo.',
            objective: 'Colaborar en el tratamiento y atención de pacientes diabéticos, con un conjunto de métodos y herramientas especializadas, gestionadas por un grupo de expertos en diversas áreas.',
            apkUrl: 'www.fundamarjorie.com/descargas/movil',
            image: 'LogoFundaMarjorie.png',
            phone: '0219 999 9999',
            phoneTwo: '0419 999 9999',
            email: 'info@fundamarjorie.com',
            rif: 'J20200399',
            history: 'La insulina fue descubierta en 1921 por Frederick Banting y Charles Best, en el laboratorio de John MacLeod en la Universidad de Toronto a través de un experimento realizado a unos perros sujetos a una diabetes experimental donde se reducía o anula la glucosa en la orina. Banting y MacLeod fueron galardonados con el premio Nobel de Medicina en 1923 por el descubrimiento de la insulina. Estos experimentos fueron conducidos en unos 10 perros diabéticos experimentales, uno de ellos era llamado “Marjorie” y en el cual el extracto pancreático lo sostuvo vivo por aproximadamente 70 días. Por eso con la intención de agradecer y homenajear a Marjorie y a todos los otros perros que con su sacrificio ayudaron al descubrimiento de la insulina, es que la fundación lleva el nombre de Marjorie. ',
            createdAt: new Date(),
            updatedAt: new Date(),
            colorPrimary: '#1F9BF5',
            colorSecondary: '#031E40',
            facebookUsername: 'FundaMarjorie',
            instagramUsername: '@fundamarjorie',
            twitterUsername: '@fundamarjorie',
            linkedinUsername: 'fundamarjorie'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Organizations', null, {});
    }
};