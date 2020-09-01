'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el título vacío.'
                }
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el contenido vacío.'
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id categoría vacío.'
                }
            }
        },
        postTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id tipo post vacío.'
                }
            }
        },
        eventDetailId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {});
    Post.associate = function(models) {
        // associations can be defined here
        Post.belongsTo(models.PostCategory, { foreignKey: 'categoryId' });
        Post.belongsTo(models.PostType, { foreignKey: 'postTypeId' });
        Post.belongsTo(models.EventDetail, { foreignKey: 'eventDetailId' });
        Post.belongsTo(models.Organization, { foreignKey: 'organizationId' });
        Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
    };
    return Post;
};