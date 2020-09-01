'use strict';
module.exports = (sequelize, DataTypes) => {
    const AppointmentHistory = sequelize.define('AppointmentHistory', {
        appointmentId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id cita vacío.'
                }
            }
        },
        medicalRecordId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id ficha médica vacío.'
                }
            }
        },
        glucoseLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener nivel de glucosa vacío.'
                }
            }
        },
        height: {
            type: DataTypes.FLOAT(2),
            validate: {
                notEmpty: {
                    msg: 'No puede tener estatura vacía.'
                },
                min: 0
            }
        },
        weight: {
            type: DataTypes.FLOAT(2),
            validate: {
                notEmpty: {
                    msg: 'No puede tener peso vacío.'
                },
                min: 0
            }
        },
        bloodPressureUp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener tensión alta vacía.'
                }
            }
        },
        bloodPressureDown: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener tensión baja vacía.'
                }
            }
        },
        physicalExamination: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el examen físico vacío.'
                }
            }
        },
        treatments: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el tratamiento vacío.'
                }
            }
        },
        medicalConditions: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener condiciones médicas vacías.'
                }
            }
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
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    AppointmentHistory.associate = function(models) {
        // associations can be defined here
        AppointmentHistory.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
        AppointmentHistory.belongsTo(models.MedicalRecord, { foreignKey: 'medicalRecordId' });
        AppointmentHistory.belongsToMany(models.RiskFactor, {
            through: 'RiskFactorDiagnosis',
            foreignKey: 'appointmentHistoryId',
            otherKey: 'riskFactorId'
        });
        AppointmentHistory.belongsToMany(models.Illness, {
            through: 'IllnessDiagnosis',
            foreignKey: 'appointmentHistoryId',
            otherKey: 'illnessId'
        });
    };
    return AppointmentHistory;
};