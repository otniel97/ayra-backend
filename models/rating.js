'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id usuario vacío.'
                }
            }
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ratingTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo calificación vacío.'
                }
            }
        },
        stars: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: 'Introduzca valores numéricos'
                },
                min: 0,
                max: 5
            }
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {});
    Rating.associate = function(models) {
        // associations can be defined here
        Rating.belongsTo(models.User, { foreignKey: 'userId' });
        Rating.belongsTo(models.Service, { foreignKey: 'serviceId' });
        Rating.belongsTo(models.EventDetail, { foreignKey: 'eventDetailId' });
        Rating.belongsTo(models.RatingType, { foreignKey: 'ratingTypeId' });
    };
    return Rating;
};