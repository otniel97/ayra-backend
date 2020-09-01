'use strict';
module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
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
    PostCategory.associate = function(models) {
        // associations can be defined here
        PostCategory.hasMany(models.Post, { foreignKey: 'categoryId', as: 'posts' });

    };
    return PostCategory;
};