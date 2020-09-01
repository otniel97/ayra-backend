'use strict';
module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id usuario vacío.'
                }
            }
        },
        activityTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        requestTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo de solicitud vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {});
    Request.associate = function(models) {
        // associations can be defined here
        Request.belongsTo(models.User, { foreignKey: 'userId' });
        Request.belongsTo(models.EventType, { foreignKey: 'activityTypeId' });
        Request.belongsTo(models.RequestType, { foreignKey: 'requestTypeId' });
    };
    return Request;
};