'use strict';
module.exports = (sequelize, DataTypes) => {
    const ParticipantType = sequelize.define('ParticipantType', {
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
    ParticipantType.associate = function(models) {
        // associations can be defined here
        ParticipantType.hasMany(models.EventParticipant, { foreignKey: 'participantTypeId' });
    };
    return ParticipantType;
};