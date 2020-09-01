'use strict';
module.exports = (sequelize, DataTypes) => {
    const PersonType = sequelize.define('PersonType', {
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
        }
    }, {});
    PersonType.associate = function(models) {
        // associations can be defined here
        PersonType.hasMany(models.Speciality, { foreignKey: 'personTypeId' });
    };
    return PersonType;
};