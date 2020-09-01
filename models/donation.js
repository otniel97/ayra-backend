'use strict';
module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el apellido vacío.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
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
            validate: {
                notEmpty: {
                    msg: 'No puede tener el teléfono vacío.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        donativeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener donativo vacío.'
                }
            }
        },
    }, {});
    Donation.associate = function(models) {
        // associations can be defined here
        Donation.belongsTo(models.Donative, { foreignKey: 'donativeId' });
    };
    return Donation;
};