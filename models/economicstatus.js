'use strict';
module.exports = (sequelize, DataTypes) => {
    const EconomicStatus = sequelize.define('EconomicStatus', {
        familyHead: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el jefe de familia vacío.'
                }
            }
        },
        housing: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el tipo de vivienda vacío.'
                }
            }
        },
        insurance: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el status seguro vacío.'
                }
            }
        },
        monthlySalary: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Salario mensual no puede estar vacío'
                }
            }
        },
        familyMembers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener cantidad de miembros vacío.'
                }
            }
        },
        other: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener descripción vacía.'
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
        medicalRecordId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id vacío.'
                }
            }
        }
    }, {});
    EconomicStatus.associate = function(models) {
        // associations can be defined here
        EconomicStatus.belongsTo(models.MedicalRecord, { foreignKey: 'medicalRecordId' });
    };
    return EconomicStatus;
};