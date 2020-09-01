'use strict';
module.exports = (sequelize, DataTypes) => {
    const ResultParameter = sequelize.define('ResultParameter', {
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
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el status vacío.'
                }
            }
        }
    }, {});
    ResultParameter.associate = function(models) {
        // associations can be defined here
        ResultParameter.belongsToMany(models.EventDetail, {
            through: 'EventResultParameter',
            foreignKey: 'resultParameterId',
            otherKey: 'eventDetailId'
        });
    };
    return ResultParameter;
};