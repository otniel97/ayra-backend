'use strict';
module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
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
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la descripción vacía.'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        address: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la dirección vacía.'
                }
            }
        },
        addressUrl: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la dirección vacía.'
                }
            }
        },
        mission: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la misión vacía.'
                }
            }
        },
        vission: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la visión vacía.'
                }
            }
        },
        values: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener los valores vacíos.'
                }
            }
        },
        objective: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el objetivo general vacío.'
                }
            }
        },
        apkUrl: {
            type: DataTypes.STRING
        },
        apk: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el teléfono vacío.'
                }
            },
        },
        phoneTwo: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el correo vacío.'
                },
                isEmail: {
                    args: true,
                    msg: 'Dirección de correo inválida'
                }
            }
        },
        rif: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'No puede tener el rif vacío.'
                }
            }
        },
        history: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'No puede tener la historia vacía.'
                }
            }
        },
        colorPrimary: {
            type: DataTypes.STRING
        },
        colorSecondary: {
            type: DataTypes.STRING
        },
        facebookUsername: {
            type: DataTypes.STRING
        },
        instagramUsername: {
            type: DataTypes.STRING
        },
        twitterUsername: {
            type: DataTypes.STRING
        },
        linkedinUsername: {
            type: DataTypes.STRING
        }
    }, {});
    Organization.associate = function(models) {
        // associations can be defined here
        Organization.hasMany(models.Faq, { foreignKey: 'organizationId', as: 'faqs' });
        Organization.hasMany(models.Message, { foreignKey: 'organizationId', as: 'messages' });
        Organization.hasMany(models.Service, { foreignKey: 'organizationId', as: 'services' });
        Organization.hasMany(models.Post, { foreignKey: 'organizationId', as: 'posts' });
    };
    return Organization;
};