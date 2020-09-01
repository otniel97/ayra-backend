'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventCancelType = sequelize.define('EventCancelType', {
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
            type: DataTypes.TEXT,
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
    EventCancelType.associate = function(models) {
        // associations can be defined here
        EventCancelType.hasMany(models.EventContingency, { foreignKey: 'eventCancelId' });
    };
    return EventCancelType;
};