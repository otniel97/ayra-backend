'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        prePatientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo cita vacío.'
                }
            }
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id servicio vacío.'
                }
            }
        },
        personId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id persona doctor vacío.'
                }
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener fecha cita vacía.'
                },
                isDate: {
                    args: true,
                    msg: 'Debe introducir una Fecha'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
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
        },
        statusAppointment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status de cita vacío.'
                }
            }
        },
        dayNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener número de día vacío.'
                }
            }
        },
        timetableId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id horario vacío.'
                }
            }
        },
        qualified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        cancelId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {});
    Appointment.associate = function(models) {
        // associations can be defined here
        Appointment.belongsTo(models.PrePatient, { foreignKey: 'prePatientId' });
        Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
        Appointment.belongsTo(models.People, { foreignKey: 'personId' });
        Appointment.belongsTo(models.AppointmentType, { foreignKey: 'typeId' });
        Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
        Appointment.belongsTo(models.Timetable, { foreignKey: 'timetableId' });
        Appointment.hasOne(models.AppointmentHistory, { foreignKey: 'appointmentId' });
        Appointment.belongsTo(models.AppointmentCancelType, { foreignKey: 'cancelId' });
    };
    return Appointment;
};