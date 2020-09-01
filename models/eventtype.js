'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventType = sequelize.define('EventType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    EventType.associate = function(models) {
        // associations can be defined here
        EventType.hasMany(models.Event, { foreignKey: 'eventTypeId' });
        EventType.hasMany(models.Request, { foreignKey: 'activityTypeId' });
    };
    return EventType;
};