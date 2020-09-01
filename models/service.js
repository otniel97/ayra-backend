'use strict';
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el nombre vacío.'
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
        icon: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el icono vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener tipo de servicio vacío.'
                }
            }
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener organización id vacío.'
                }
            }
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        specialityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id especialidad vacío.'
                }
            }
        }
    }, {});
    Service.associate = function(models) {
        // associations can be defined here
        Service.belongsTo(models.ServiceType, { foreignKey: 'typeId' });
        Service.belongsTo(models.Organization, { foreignKey: 'organizationId' });
        Service.belongsTo(models.Speciality, { foreignKey: 'specialityId' });
        Service.hasMany(models.Appointment, { foreignKey: 'serviceId' });
        Service.hasMany(models.Rating, { foreignKey: 'serviceId' })
        Service.belongsToMany(models.RatingType, {
            through: 'ServiceRatingType',
            foreignKey: 'serviceId',
            otherKey: 'ratingTypeId'
        });
    };
    return Service;
};