"use strict";
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define(
    "Company",
    {
      name: { type: DataTypes.STRING(100), notNull: true },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      phoneNumber: { type: DataTypes.STRING },
      jobDescription: {
        type: DataTypes.STRING,
        notNull: true,
        validate: {
          len: [1, 250]
        }
      },
      website: {
        type: DataTypes.STRING,
        validate: { isUrl: true }
      }
    },
    {
      timestamps: false
    }
  );
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.Jobs);
  };
  return Company;
};
