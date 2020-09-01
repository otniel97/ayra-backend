'use strict';
module.exports = (sequelize, DataTypes) => {
    const GeneralInformation = sequelize.define('GeneralInformation', {
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el título vacío.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
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
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener id vacío.'
                }
            }
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {});
    GeneralInformation.associate = function(models) {
        // associations can be defined here
        GeneralInformation.belongsTo(models.WebContent, { foreignKey: 'webId' });
    };
    return GeneralInformation;
};