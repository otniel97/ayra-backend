'use strict';
module.exports = (sequelize, DataTypes) => {
    const DiabetesType = sequelize.define('DiabetesType', {
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
    DiabetesType.associate = function(models) {
        // associations can be defined here
        DiabetesType.hasMany(models.MedicalRecord, { foreignKey: 'diabetesId' });
    };
    return DiabetesType;
};