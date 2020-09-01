'use strict';
module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define('Faq', {
        question: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la pregunta vacía.'
                }
            }
        },
        answer: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener la respuesta vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el estatus vacío.'
                }
            }
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id organización vacío.'
                }
            }
        }
    }, {});
    Faq.associate = function(models) {
        // associations can be defined here
        Faq.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    };
    return Faq;
};