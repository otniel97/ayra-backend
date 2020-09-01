'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('MeasurementTypes', [{
        name: 'HbA1C o Hemoglobina glucosilada',
        description: 'Análisis de sangre que indica los niveles promedio de glucosa en la sangre (azúcar en la sangre) durante los últimos 3 meses.',
        status: true,
        lowerRank: 5.7,
        upperRank:8,
        dangerLevel: 6.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        upperMessage:'Un nivel de A1C por encima del 8 % significa que la diabetes no está bien controlada y tienes un mayor riesgo de desarrollar complicaciones relacionadas con esta.',
        downMessage:'La prediabetes se ubica entre 5,7 a 6,4 por ciento. Tener prediabetes es un factor de riesgo para desarrollar diabetes tipo 2.',
        inRangeMessage:'Un nivel de A1C del 6.5 % o más en dos ocasiones individuales indica que tienes diabetes',
      }, {
        name: 'Glicemia en ayunas',
        description: 'El examen de glucosa se realiza con la finalidad de verificar la cantidad de azúcar en la sangre. Se realiza en ayunas',
        status: true,
        lowerRank: 80,
        upperRank:130,
        dangerLevel: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
        upperMessage:'A partir de 130mg/dl esta en un nivel crítico. Tiene prediabetes o diabetes mal controlada, busque asistencia médica',
        downMessage:'En 80mg/dl este en un rango normal, siga cuidandose. Si es menor a 70mg/dl es hipoglicemia busque ayuda rápidamente',
        inRangeMessage:'Esta en el rango esperado debido a su condición, siga tomando las medidas necesarias para su cuidado',
      }, {
        name: 'Glicemia post-prandial',
        description: 'Los valores de referencia de la prueba de intolerancia a la glucosa se refieren al valor de la glucosa 2 horas o 120 minutos después de la ingestión de la glucosa.',
        status: true,
        lowerRank: 140,
        upperRank:200,
        dangerLevel: 215,
        createdAt: new Date(),
        updatedAt: new Date(),
        upperMessage:'Un nivel de glucosa en la sangre de 200 mg/dL y más alto, indica que es probable que tengas diabetes.',
        downMessage:'Un nivel de glucosa en la sangre de 140-199 mg/dL indica que es posible que tengas prediabetes.',
        inRangeMessage:'Esta en el rango esperado debido a su condición, siga tomando las medidas necesarias para su cuidado'
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('MeasurementTypes', null, {});
    
  }
};
