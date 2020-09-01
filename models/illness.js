'use strict';
module.exports = (sequelize, DataTypes) => {

    const Illness = sequelize.define('Illness', {
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
            type: DataTypes.STRING,
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
    Illness.associate = function(models) {
        // associations can be defined here
        Illness.belongsToMany(models.AppointmentHistory, {
            through: 'IllnessDiagnosis',
            foreignKey: 'illnessId',
            otherKey: 'appointmentHistoryId'
        });
    };
    return Illness;
};