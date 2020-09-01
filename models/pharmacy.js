'use strict';
module.exports = (sequelize, DataTypes) => {
    const Pharmacy = sequelize.define('Pharmacy', {
        name: {
            type: DataTypes.STRING,
            unique: true,
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
        address: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la dirección vacía.'
                }
            }
        },
        addressUrl: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la dirección vacía.'
                }
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el número de teléfono vacío.'
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
        },
        webId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id vacío.'
                }
            }
        }
    }, {});
    Pharmacy.associate = function(models) {
        // associations can be defined here
        Pharmacy.belongsTo(models.WebContent, { foreignKey: 'webId' });
    };
    return Pharmacy;
};