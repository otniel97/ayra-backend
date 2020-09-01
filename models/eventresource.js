'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventResource = sequelize.define('EventResource', {
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de evento vacío.'
                }
            }
        },
        resourceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de recurso vacío.'
                }
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos'
                },
                notEmpty: {
                    msg: 'No puede tener cantidad vacía.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {});
    EventResource.associate = function(models) {
        // associations can be defined here
    };
    return EventResource;
};