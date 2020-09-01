'use strict';
module.exports = (sequelize, DataTypes) => {
    const SystemFunction = sequelize.define('SystemFunction', {
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
            type: DataTypes.TEXT,
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
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {});
    SystemFunction.associate = function(models) {
        // associations can be defined here
        SystemFunction.hasMany(models.SystemFunction, { as: 'child', foreignKey: 'parentId' });
        SystemFunction.belongsTo(models.SystemFunction, { as: 'parent', foreignKey: 'parentId' });
        SystemFunction.belongsToMany(models.Role, {
            through: 'SystemFunctionRoles',
            foreignKey: 'systemFunctionId',
            otherKey: 'roleId'
        });
    };
    return SystemFunction;
};