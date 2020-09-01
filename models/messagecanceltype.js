'use strict';
module.exports = (sequelize, DataTypes) => {
    const MessageCancelType = sequelize.define('MessageCancelType', {
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
    MessageCancelType.associate = function(models) {
        // associations can be defined here
        MessageCancelType.hasMany(models.Message, { foreignKey: 'cancelId' });
    };
    return MessageCancelType;
};