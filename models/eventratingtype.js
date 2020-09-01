'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventRatingType = sequelize.define('EventRatingType', {
        ratingTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de tipo calificación vacío.'
                }
            }
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de evento vacío.'
                }
            }
        },
    }, {});
    EventRatingType.associate = function(models) {
        // associations can be defined here
    };
    return EventRatingType;
};