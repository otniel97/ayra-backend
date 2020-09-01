'use strict';
module.exports = (sequelize, DataTypes) => {
    const WebContent = sequelize.define('WebContent', {
        initialDescription: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'La descripción inicial no puede estar vacía.'
                }
            }
        },
        weImage: {
            type: DataTypes.STRING
        },
        weDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción NOSOTROS no puede estar vacía.'
                }
            }
        },
        serviceDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción de SERVICIOS no puede estar vacía.'
                }
            }
        },
        interestDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción INTERES no puede estar vacía.'
                }
            }
        },
        newsDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción NOTICIAS no puede estar vacía.'
                }
            }
        },
        eventsDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción EVENTOS no puede estar vacía.'
                }
            }
        },
        downloadDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'La descripción DESCARGAS no puede estar vacía.'
                }
            }
        },
        downloadImage: {
            type: DataTypes.STRING
        },
        voluntaryTitle: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        voluntaryMessage: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        voluntaryDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        donationTitle: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        donationMessage: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        donationDescription: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        sitesTitle: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        sitesMessage: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                }
            }
        },
        maxService: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                },
                isInt: {
                    msg: 'Introduzca valores numéricos'
                },
                min: 3,
                max: 10
            }
        },
        maxGeneral: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'no puede estar vacío.'
                },
                isInt: {
                    msg: 'Introduzca valores numéricos'
                },
                min: 3,
                max: 10
            }
        },
        mainImage: {
            type: DataTypes.STRING,
        },
        missionImage: {
            type: DataTypes.STRING,
        },
        visionImage: {
            type: DataTypes.STRING,
        },
        targetImage: {
            type: DataTypes.STRING,
        }
    }, {});
    WebContent.associate = function(models) {
        // associations can be defined here
        WebContent.hasMany(models.MedicalCenter, { foreignKey: 'webId', as: 'medicalCenters' });
        WebContent.hasMany(models.GeneralInformation, { foreignKey: 'webId', as: 'generalInformations' });
        WebContent.hasMany(models.Pharmacy, { foreignKey: 'webId', as: 'pharmacies' });
    };
    return WebContent;
};