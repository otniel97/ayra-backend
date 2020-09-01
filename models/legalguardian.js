'use strict';
module.exports = (sequelize, DataTypes) => {
    const LegalGuardian = sequelize.define('LegalGuardian', {
        patientId: {
            type: DataTypes.INTEGER,
            unique:true,            
            validate: {
                notEmpty: {
                    msg: 'El id paciente no puede estar vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                notEmpty: {
                    msg: 'El estatus no puede estar vacío.'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El nombre no puede estar vacío.'
                }
            }
        },
        surname: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'El apellido no puede estar vacío.'
                }
            }
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['masculino', 'femenino']
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La fecha de nacimiento no puede estar vacía.'
                }
            }
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La relación con el paciente no puede estar vacía.'
                }
            }
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    }, {});
    LegalGuardian.associate = function(models) {
        // associations can be defined here
        LegalGuardian.belongsTo(models.Patient, {foreignKey: 'patientId'});
    };
    return LegalGuardian;
};