'use strict';
module.exports = (sequelize, DataTypes) => {
    const RatingType = sequelize.define('RatingType', {
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
        entity: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['citas', 'actividades'],
            validate: {
                notEmpty: {
                    msg: 'No puede tener la entidad vacía.'
                }
            }
        },
        scale: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['estrellas', 'respuestas'],
            validate: {
                notEmpty: {
                    msg: 'No puede tener la entidad vacía.'
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
    RatingType.associate = function(models) {
        // associations can be defined here
        RatingType.hasMany(models.Rating, { foreignKey: 'ratingTypeId' });
        RatingType.belongsToMany(models.Event, {
            through: 'EventRatingType',
            foreignKey: 'ratingTypeId',
            otherKey: 'eventId'
        });
        RatingType.belongsToMany(models.Service, {
            through: 'ServiceRatingType',
            foreignKey: 'ratingTypeId',
            otherKey: 'serviceId'
        });
    };
    return RatingType;
};