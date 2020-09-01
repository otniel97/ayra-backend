'use strict';
module.exports = (sequelize, DataTypes) => {
	const AssignedDonative = sequelize.define('AssignedDonative', {
		patientId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: 'El id del paciente no puede estar vacío.'
			}
		},
		donativeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: 'El id del donativo no puede estar vacío.'
			}
		},
		assignationDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
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
		AssignedDonative.associate = function(models) {
		// associations can be defined here
		AssignedDonative.belongsTo(models.Patient, {foreignKey: 'patientId' });
		AssignedDonative.belongsTo(models.Donative, {foreignKey: 'donativeId'});
	};
	return AssignedDonative;
};