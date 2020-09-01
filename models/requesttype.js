'use strict';
module.exports = (sequelize, DataTypes) => {
    const RequestType = sequelize.define('RequestType', {
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
    RequestType.associate = function(models) {
        // associations can be defined here
        RequestType.hasMany(models.Request, { foreignKey: 'requestTypeId' });
    };
    return RequestType;
};