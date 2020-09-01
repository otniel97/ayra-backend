'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el comentario vacío.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id usuario vacío.'
                }
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'No puede tener id post vacío.'
                }
            }
        }
    }, {});
    Comment.associate = function(models) {
        // associations can be defined here
        Comment.belongsTo(models.Post, { foreignKey: 'postId' });
        Comment.belongsTo(models.User, { foreignKey: 'userId' });


    };
    return Comment;
};