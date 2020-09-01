'use strict';
module.exports = (sequelize, DataTypes) => {
    const NotificationType = sequelize.define('NotificationType', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        message: {
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
    NotificationType.associate = function(models) {
        // associations can be defined here
        NotificationType.hasMany(models.Notification, { foreignKey: 'typeId' });
    };
    return NotificationType;
};