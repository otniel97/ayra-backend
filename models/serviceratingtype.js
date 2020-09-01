'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceRatingType = sequelize.define('ServiceRatingType', {
    ratingTypeId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER
  }, {});
  ServiceRatingType.associate = function(models) {
    // associations can be defined here
  };
  return ServiceRatingType;
};