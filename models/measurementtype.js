'use strict';
module.exports = (sequelize, DataTypes) => {
    const MeasurementType = sequelize.define('MeasurementType', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        lowerRank: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener el nivel inferior vacío.'
                }
            }
        },
        upperRank: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener el nivel superior vacío.'
                }
            }
        },
        dangerLevel: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nivel de riesgo vacío.'
                }
            }
        },
        upperMessage: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el mensaje de peligro superior vacio.'
                }
            }
        },
        downMessage: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el mensaje de peligro inferior vacio.'
                }
            }
        },
        inRangeMessage: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el mensaje de rango vacio.'
                }
            }
        }
    }, {});
    MeasurementType.associate = function(models) {
        // associations can be defined here
        MeasurementType.hasMany(models.GlucoseMeasurement, { foreignKey: 'measurementTypeId'});
    };
    return MeasurementType;
};