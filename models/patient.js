'use strict';
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
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
                    msg: 'No puede tener fecha nacimiento vacía.'
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
        maritalStatus: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['soltero', 'casado', 'viudo']
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la dirección vacía.'
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
        rif: {
            type: DataTypes.STRING,
            allowNull: true
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
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status vacío.'
                }
            }
        },
        transaction: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {});
    Patient.associate = function(models) {
        // associations can be defined here
        Patient.belongsTo(models.User, { foreignKey: 'userId' });
        Patient.hasOne(models.LegalGuardian, { foreignKey: 'patientId' });
        Patient.hasMany(models.GlucoseMeasurement, { foreignKey: 'patientId' });
        Patient.hasOne(models.MedicalRecord, { foreignKey: 'patientId' });
        Patient.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
        Patient.hasMany(models.AssignedDonative, { foreignKey: 'patientId' });
        Patient.belongsToMany(models.EventDetail, {
            through: 'EventDetailPatient',
            foreignKey: 'patientId',
            otherKey: 'eventDetailId'
        });
    };
    return Patient;
}