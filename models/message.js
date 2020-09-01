'use strict';
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        senderName: {
            type: DataTypes.STRING,
        },
        senderEmail: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el email vacío.'
                },
                isEmail: {
                    args: true,
                    msg: 'Dirección de correo inválida'
                }
            }
        },
        subject: {
            type: DataTypes.STRING,
        },
        messageContent: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el email vacío.'
                }
            },
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo mensaje vacío.'
                }
            }
        },
        canceled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        attentionDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        response: {
            type: DataTypes.TEXT,
        },
        cancelId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {});
    Message.associate = function(models) {
        // associations can be defined here
        Message.belongsTo(models.Organization, { foreignKey: 'organizationId' });
        Message.belongsTo(models.MessageType, { foreignKey: 'typeId' });
        Message.belongsTo(models.MessageCancelType, { foreignKey: 'cancelId' });
        Message.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Message;
};