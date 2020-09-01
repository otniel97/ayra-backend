'use strict';
module.exports = (sequelize, DataTypes) => {
    const EventDetail = sequelize.define('EventDetail', {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de evento vacío.'
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
        },
        evaluation: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        statusDetail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus del detalle vacío.'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        plannedDate: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la fecha de planificación vacía.'
                }
            }
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener hora.'
                }
            }
        },
        realDate: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la fecha real vacía.'
                }
            }
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el lugar vacío.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener descripción vacía.'
                }
            }
        }
    }, {});
    EventDetail.associate = function(models) {
        // associations can be defined here
        EventDetail.belongsTo(models.Event, { foreignKey: 'eventId' });
        EventDetail.hasMany(models.Post, { foreignKey: 'eventDetailId' });
        EventDetail.hasMany(models.Guest, { foreignKey: 'eventDetailId' });
        EventDetail.hasMany(models.EventParticipant, { foreignKey: 'eventDetailId' });
        EventDetail.hasMany(models.EventContingency, { foreignKey: 'eventDetailId' });
        EventDetail.hasMany(models.Rating, { foreignKey: 'eventDetailId' });
        EventDetail.belongsToMany(models.Resource, {
            through: 'EventResource',
            foreignKey: 'eventDetailId',
            otherKey: 'resourceId'
        });
        EventDetail.belongsToMany(models.ResultParameter, {
            through: 'EventResultParameter',
            foreignKey: 'eventDetailId',
            otherKey: 'resultParameterId'
        });
        EventDetail.belongsToMany(models.Patient, {
            through: 'EventDetailPatient',
            foreignKey: 'eventDetailId',
            otherKey: 'patientId'
        });
    };
    return EventDetail;
};