'use strict';
module.exports = (sequelize, DataTypes) => {
    const RiskFactor = sequelize.define('RiskFactor', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        }
    }, {});
    RiskFactor.associate = function(models) {
        // associations can be defined here
        RiskFactor.belongsToMany(models.AppointmentHistory, {
            through: 'RiskFactorDiagnosis',
            foreignKey: 'riskFactorId',
            otherKey: 'appointmentHistoryId'
        });
    };
    return RiskFactor;
};