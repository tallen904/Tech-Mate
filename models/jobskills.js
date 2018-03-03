"use strict";
module.exports = (sequelize, DataTypes) => {
  var JobSkills = sequelize.define(
    "JobSkills",
    {
      html: { type: DataTypes.INTEGER },
      css: { type: DataTypes.INTEGER },
      javascript: { type: DataTypes.INTEGER },
      nodejs: { type: DataTypes.INTEGER },
      reactjs: { type: DataTypes.INTEGER }
    },
    { timestamps: false }
  );
  JobSkills.associate = function(models) {
    // associations can be defined here
    JobSkills.belongsTo(models.Jobs)
  };
  return JobSkills;
};
