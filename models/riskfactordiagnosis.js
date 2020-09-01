'use strict';
module.exports = (sequelize, DataTypes) => {
    const RiskFactorDiagnosis = sequelize.define('RiskFactorDiagnosis', {
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        riskFactorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        appointmentHistoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    RiskFactorDiagnosis.associate = function(models) {
        // associations can be defined here
        //RiskFactorDiagnosis.belongsTo(models.RiskFactor, { foreignKey: 'riskFactorId' });
        //RiskFactorDiagnosis.belongsTo(models.AppointmentHistory, { foreignKey: 'appointmentHistoryId' });
    };
    return RiskFactorDiagnosis;
};