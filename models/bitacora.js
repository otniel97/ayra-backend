'use strict';
module.exports = (sequelize, DataTypes) => {
    const Bitacora = sequelize.define('Bitacora', {
        modelName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener modelo vacío.'
                }
            }
        },
        recordId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: 'El id del objeto del modelo involucrado no puede estar vacío.'
            }
        },
        recordName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener nombre o titulo vacío.'
                }
            }
        },
        operation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la operación vacía.'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener fecha cita vacía.'
                },
                isDate: {
                    args: true,
                    msg: 'Debe introducir una Fecha'
                }
            }
        }
    }, {});
    Bitacora.associate = function(models) {
        // associations can be defined here
        Bitacora.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Bitacora;
};