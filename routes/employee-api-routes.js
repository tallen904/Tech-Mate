const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all employee information
router.get("/api/employees", (req, res) => {
  db.Employee.findAll({ include: [db.EmployeeSkills] }).then(employees => {
    res.json(employees);
  });
});

// Post a new employee
router.post("/api/employees", (req, res) => {
  db.Employee.create(req.body, {
    include: [db.EmployeeSkills]
  }).then(dbpost => res.json(dbpost));
});

module.exports = router;
