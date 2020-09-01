'use strict';
module.exports = (sequelize, DataTypes) => {
    const Guest = sequelize.define('Guest', {
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id de detalle evento vacío.'
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el correo vacío.'
                },
                isEmail: {
                    args: true,
                    msg: 'Dirección de correo inválida'
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el teléfono vacío.'
                }
            }
        },
        occupations: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener ocupaciones vacía.'
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
    Guest.associate = function(models) {
        // associations can be defined here
        Guest.belongsTo(models.EventDetail, { foreignKey: 'eventDetailId' });
    };
    return Guest;
};