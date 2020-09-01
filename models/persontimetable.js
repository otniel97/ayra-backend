'use strict';
module.exports = (sequelize, DataTypes) => {
	const PersonTimetable = sequelize.define('PersonTimetable', {
		status: {
			type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
		},
		personId: {
			type: DataTypes.INTEGER,
            allowNull: false
		},
		timetableId: {
			type: DataTypes.INTEGER,
            allowNull: false
		}
	}, 
	{});
	PersonTimetable.associate = function(models) {
	// associations can be defined here
	};
	return PersonTimetable;
};