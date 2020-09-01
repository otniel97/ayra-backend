'use strict';
module.exports = (sequelize, DataTypes) => {
    const Timetable = sequelize.define('Timetable', {
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
        },
        day: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            validate: {
                notEmpty: {
                    msg: 'Debe tener día seleccionado.'
                }
            }
        },
        timeStart: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener hora inicio.'
                }
            }
        },
        timeEnd: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener hora final.'
                }
            }
        },
        dayNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener número de día seleccionado.'
                }
            }
        },
        maxPatients: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe tener número máximo de pacientes admitidos.'
                }
            }
        }
    }, {});
    Timetable.associate = function(models) {
        // associations can be defined here
        Timetable.belongsToMany(models.People, {
            through: 'PersonTimetables',
            foreignKey: 'timetableId',
            otherKey: 'personId'
        });
        Timetable.hasMany(models.Appointment, { foreignKey: 'timetableId', as: 'appointments' });
    };
    return Timetable;
};