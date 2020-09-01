'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el tema vacío.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener descripción vacía.'
                }
            }
        },
        eventTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo de evento vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    Event.associate = function(models) {
        // associations can be defined here
        Event.belongsTo(models.EventType, { foreignKey: 'eventTypeId' });
        Event.hasMany(models.EventDetail, { foreignKey: 'eventId' });
        Event.belongsToMany(models.RatingType, {
            through: 'EventRatingType',
            foreignKey: 'eventId',
            otherKey: 'ratingTypeId'
        });
    };
    return Event;
};