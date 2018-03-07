"use strict";
module.exports = (sequelize, DataTypes) => {
  var Jobs = sequelize.define(
    "Jobs",
    {
      company: { type: DataTypes.STRING(200) },
      jobTitle: { type: DataTypes.STRING(150) },
      jobDescription: { type: DataTypes.STRING(250) }
    },
    { timestamps: false }
  );
  Jobs.associate = function(models) {
    // associations can be defined here
    Jobs.belongsTo(models.Company)
    Jobs.belongsToMany(models.Employee ,{through: "EmployeeJobs"});
    Jobs.hasOne(models.JobSkills);
  };
  return Jobs;
};
