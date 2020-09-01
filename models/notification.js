'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo notificación vacío.'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id usuario vacío.'
                }
            }
        },
        modelId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el modelo vacío.'
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
    Notification.associate = function(models) {
        // associations can be defined here
        Notification.belongsTo(models.User, { foreignKey: 'userId' });
        Notification.belongsTo(models.NotificationType, { foreignKey: 'typeId' });
    };
    return Notification;
};