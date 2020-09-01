'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Administrador',
      description: 'Super usuario del sistema, tiene acceso a la administracion del sitio',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Propietario',
      description: 'Puede acceder a todas las capacidades del sistema',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Secretario',
      description: 'Usuario que atiende solicitudes y gestiona actividades',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Paciente',
      description: 'Despues de ser aceptado, recibe atencion medica y participa en actividades',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Medico',
      description: 'Ejecuta citas medicas, proporciona juicios de valor y colabora en actividades',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Voluntario',
      description: 'Usuario disponible para colaborar en actividades',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Recepcionista',
      description: 'Usuario disponible para colaborar en atender mensajes, donaciones, solicitudes y asignar horarios',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
