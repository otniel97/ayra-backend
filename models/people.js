'use strict';
module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('People', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el apellido vacío.'
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
                    msg: 'No puede tener la fecha de nacimiento vacía.'
                },
                isDate: {
                    args: true,
                    msg: 'Debe introducir una Fecha'
                }
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el teléfono vacío.'
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la dirección vacía.'
                }
            }
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la cédula vacía.'
                }
            }
        },
        rif: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id usuario vacío.'
                }
            }
        },
        specialityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id especialidad vacío.'
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
    People.associate = function(models) {
        // associations can be defined here
        People.belongsTo(models.User, { foreignKey: 'userId' });
        People.belongsTo(models.Speciality, { foreignKey: 'specialityId' });
        People.belongsToMany(models.Timetable, {
            through: 'PersonTimetables',
            foreignKey: 'personId',
            otherKey: 'timetableId'
        });
        People.hasMany(models.Appointment, { foreignKey: 'personId', as: 'appointments' });
    };
    return People;
};