'use strict';
module.exports = (sequelize, DataTypes) => {
    const ServiceType = sequelize.define('ServiceType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
                }
            }
        },
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
            allowNull: false
        },
    }, {});
    ServiceType.associate = function(models) {
        // associations can be defined here
        ServiceType.hasMany(models.Service, { foreignKey: 'typeId', as: 'services' });
    };
    return ServiceType;
};