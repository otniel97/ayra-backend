'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventParticipant = sequelize.define('EventParticipant', {
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de detalle evento vacío.'
                }
            }
        },
        participantTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de tipo participante vacío.'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de usuario vacío.'
                }
            }
        },
        assistedEvent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el status vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {});
    EventParticipant.associate = function(models) {
        // associations can be defined here
        EventParticipant.belongsTo(models.EventDetail, { foreignKey: 'eventDetailId' });
        EventParticipant.belongsTo(models.User, { foreignKey: 'userId' });
        EventParticipant.belongsTo(models.ParticipantType, { foreignKey: 'participantTypeId' });
    };
    return EventParticipant;
};