"use strict";
const db = require('../models/')
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define("Employee", {
    name: { type: DataTypes.STRING(100), notNull: true },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    summary: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1, 250]
      }
    },
    githubUrl: { type: DataTypes.STRING, validate: { isUrl: true } },
    phoneNumber: { type: DataTypes.STRING }
  }, {
    timestamps: false
  });
  Employee.associate = function(models) {
    // associations can be defined here
    // Employee.hasMany(models.Jobs)
    Employee.hasOne(models.EmployeeSkills)
  };
  return Employee;
};
