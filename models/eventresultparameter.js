'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventResultParameter = sequelize.define('EventResultParameter', {
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de evento vacío.'
                }
            }
        },
        resultParameterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id parámetro de resultado evento vacío.'
                }
            }
        },
        minValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener valor mínimo vacío.'
                }
            }
        },
        maxValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener valor máximo vacío.'
                }
            }
        },
        realValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                }
            }
        },
    }, {});
    EventResultParameter.associate = function(models) {
        // associations can be defined here
    };
    return EventResultParameter;
};