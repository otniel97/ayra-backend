'use strict';
module.exports = (sequelize, DataTypes) => {
    const AppointmentCancelType = sequelize.define('AppointmentCancelType', {
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
    AppointmentCancelType.associate = function(models) {
        // associations can be defined here
        AppointmentCancelType.hasMany(models.Appointment, { foreignKey: 'cancelId' });
    };
    return AppointmentCancelType;
};