'use strict';
module.exports = (sequelize, DataTypes) => {
    const PrePatient = sequelize.define('PrePatient', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el apellido vacío.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El correo no puede estar vacío.'
                },
                isEmail: {
                    msg: 'El correo debe ser un email valido'
                }
            }
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['masculino', 'femenino'],
            validate: {
                notEmpty: {
                    msg: 'No puede tener el sexo vacío.'
                }
            }
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la fecha de nacimiento vacía.'
                },
                isDate: {
                    args: true,
                    msg: 'Debe introducir una Fecha'
                }
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el teléfono vacío.'
                }
            }
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la cédula vacía.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    PrePatient.associate = function(models) {
        // associations can be defined here
        PrePatient.hasMany(models.Appointment, { foreignKey: 'prePatientId', as: 'appointments' });
    };
    return PrePatient;
};