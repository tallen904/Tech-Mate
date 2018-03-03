"use strict";
module.exports = (sequelize, DataTypes) => {
  var EmployeeSkills = sequelize.define(
    "EmployeeSkills",
    {
      html: { type: DataTypes.INTEGER },
      css: { type: DataTypes.INTEGER },
      javascript: { type: DataTypes.INTEGER },
      nodejs: { type: DataTypes.INTEGER },
      reactjs: { type: DataTypes.INTEGER }
    },
    { timestamps: false }
  );
  EmployeeSkills.associate = function(models) {
    // associations can be defined here
    EmployeeSkills.belongsTo(models.Employee);
  };
  return EmployeeSkills;
};
