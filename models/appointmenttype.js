'use strict';
module.exports = (sequelize, DataTypes) => {
    const AppointmentType = sequelize.define('AppointmentType', {
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
    AppointmentType.associate = function(models) {
        // associations can be defined here
        AppointmentType.hasMany(models.Appointment, { foreignKey: 'typeId', as: 'appointments' });
    };
    return AppointmentType;
};