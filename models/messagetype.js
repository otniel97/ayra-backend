'use strict';
module.exports = (sequelize, DataTypes) => {
    const MessageType = sequelize.define('MessageType', {
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
            type: DataTypes.STRING,
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
    MessageType.associate = function(models) {
        // associations can be defined here
        MessageType.hasMany(models.Message, { foreignKey: 'typeId', as: 'mssages' });
    };
    return MessageType;
};