'use strict';
module.exports = (sequelize, DataTypes) => {
	const SystemFunctionRole = sequelize.define('SystemFunctionRole', {
		status: {
			type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'No puede tener el estatus vacío.'
                }
            }
		},
		systemFunctionId:{
			type: DataTypes.INTEGER,
            allowNull: false
		},
		roleId: {
			type: DataTypes.INTEGER,
            allowNull: false
		}
	}, 
	{});
	SystemFunctionRole.associate = function(models) {
	// associations can be defined here
	};
	return SystemFunctionRole;
};