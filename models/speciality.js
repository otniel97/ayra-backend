'use strict';
module.exports = (sequelize, DataTypes) => {
    const Speciality = sequelize.define('Speciality', {
        name: {
            type: DataTypes.STRING,
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
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        personTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo de persona vacío.'
                }
            }
        }
    }, {});
    Speciality.associate = function(models) {
        // associations can be defined here
        Speciality.hasMany(models.People, { foreignKey: 'specialityId', as: 'peoples' });
        Speciality.hasMany(models.Service, { foreignKey: 'specialityId' });
        Speciality.belongsTo(models.PersonType, { foreignKey: 'personTypeId' });
    };
    return Speciality;
};