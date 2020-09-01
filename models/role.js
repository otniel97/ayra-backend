'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
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
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La descripción no puede estar vacía'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus.'
                }
            }
        }
    }, {});
    Role.associate = function(models) {
        // associations can be defined here
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
        Role.belongsToMany(models.SystemFunction, {
            through: 'SystemFunctionRoles',
            foreignKey: 'roleId',
            otherKey: 'systemFunctionId'
        });
    };
    return Role;
};