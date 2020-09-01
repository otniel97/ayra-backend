'use strict';
module.exports = (sequelize, DataTypes) => {
    const PostType = sequelize.define('PostType', {
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
    PostType.associate = function(models) {
        // associations can be defined here
        PostType.hasMany(models.Post, { foreignKey: 'postTypeId', as: 'posts' });

    };
    return PostType;
};