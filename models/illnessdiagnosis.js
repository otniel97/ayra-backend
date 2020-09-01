'use strict';
module.exports = (sequelize, DataTypes) => {
    const IllnessDiagnosis = sequelize.define('IllnessDiagnosis', {
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        illnessId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        appointmentHistoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    IllnessDiagnosis.associate = function(models) {
        // associations can be defined here
    };
    return IllnessDiagnosis;
};