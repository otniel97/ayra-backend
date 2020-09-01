'use strict ';
module.exports = (sequelize, DataTypes) => {
    const MedicalRecord = sequelize.define('MedicalRecord', {
        bloodType: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el tipo de sangre vacío.'
                }
            }
        },
        personalBackground: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener los antecedentes vacío.'
                }
            }
        },
        familyBackground: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener los antecedentes vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el status vacío.'
                }
            }
        },
        amputated: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el campo amputado vacío.'
                }
            }
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id vacío.'
                }
            }
        },
        diabetesId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id vacío.'
                }
            }
        }
    }, {});
    MedicalRecord.associate = function(models) {
        // associations can be defined here
        MedicalRecord.belongsTo(models.Patient, { foreignKey: 'patientId' });
        MedicalRecord.hasOne(models.EconomicStatus, { foreignKey: 'medicalRecordId' });
        MedicalRecord.hasMany(models.AppointmentHistory, { foreignKey: 'medicalRecordId' });
        MedicalRecord.belongsTo(models.DiabetesType, { foreignKey: 'diabetesId' });
    };
    return MedicalRecord;
};