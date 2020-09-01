'use strict';
module.exports = (sequelize, DataTypes) => {
	const EventDetailPatient = sequelize.define('EventDetailPatient', {
		eventDetailId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		patientId: {
			type:DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
		}
	}, {});
	EventDetailPatient.associate = function(models) {
		// associations can be defined here
	};
	return EventDetailPatient;
};