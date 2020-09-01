'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventContingency = sequelize.define('EventContingency', {
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventCancelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        initialDate: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la fecha de planificación vacía.'
                }
            }
        },
        initialTime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener hora inicio.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    EventContingency.associate = function(models) {
        // associations can be defined here
        EventContingency.belongsTo(models.EventDetail, { foreignKey: 'eventDetailId' });
        EventContingency.belongsTo(models.EventCancelType, { foreignKey: 'eventCancelId' });
    };
    return EventContingency;
};