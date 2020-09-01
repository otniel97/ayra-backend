'use strict';
module.exports = (sequelize, DataTypes) => {
    const Donative = sequelize.define('Donative', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
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
            defaultValue: false,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener tipo de donación vacío.'
                }
            }
        },
    }, {});
    Donative.associate = function(models) {
        // associations can be defined here
        Donative.belongsTo(models.DonationType, { foreignKey: 'typeId' });
        Donative.hasMany(models.Donation, { foreignKey: 'donativeId' });
        Donative.hasMany(models.AssignedDonative, { foreignKey: 'donativeId' });
    };
    return Donative;
};