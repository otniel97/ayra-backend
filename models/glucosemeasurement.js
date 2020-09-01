'use strict';
module.exports = (sequelize, DataTypes) => {
    const GlucoseMeasurement = sequelize.define('GlucoseMeasurement', {
        measurementTypeId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el tipo de medicion vacio.'
                }
            }
        },
        patientId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el paciente asociado vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus.'
                }
            }
        },
        result: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener campo resultado vacío.'
                }
            }
        },
        resultDate: {
            type: DataTypes.DATEONLY,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la fecha vacía.'
                }
            }
        }
    }, {});
    GlucoseMeasurement.associate = function(models) {
        // associations can be defined here
        GlucoseMeasurement.belongsTo(models.MeasurementType, { foreignKey: 'measurementTypeId' });
        GlucoseMeasurement.belongsTo(models.Patient, { foreignKey: 'patientId' });
    };
    return GlucoseMeasurement;
};