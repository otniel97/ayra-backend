'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define('Resource', {
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
    Resource.associate = function(models) {
        // associations can be defined here
        Resource.belongsToMany(models.EventDetail, {
            through: 'EventResource',
            foreignKey: 'resourceId',
            otherKey: 'eventDetailId'
        });
    };
    return Resource;
};