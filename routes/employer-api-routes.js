const express = require("express");
const router = express.Router();
const db = require("../models");

// Routes
// =============================================================

// GET route for getting all of the posts
router.get("/api/companies/", function(req, res) {
  db.Company.findAll({}).then(function(dbCompany) {
    res.json(dbCompany);
  });
});

// Get route for returning posts of a specific category
router.get("/api/company/:id", function(req, res) {
  db.Company
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbCompany) {
      res.json(dbCompany);
    });
});

//get jobs and job skills for company
// router.get("/api/companyjobs/:id", function(req, res) {
//   db.Company
//     .findAll({
//       where: {
//         id: req.params.id
//       },
//       include: [db.Jobs] && [db.JobSkills]
//     })
//     .then(function(dbCompanyjobs) {
//       res.json(dbCompanyjobs);
//     });
// });

//get all jobs
router.get("/api/jobs/", function(req, res) {
  db.Jobs.findAll({}).then(function(dbJobs) {
    res.json(dbJobs);
  });
});

//get jobs by id
router.get("/api/jobs/:id", function(req, res) {
  db.Jobs
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbJob) {
      res.json(dbJob);
    });
});

//get jobs by company id
router.get("/api/jobsbycompany/:id", function(req, res) {
  db.Jobs
    .findAll({
      where: {
        companyid: req.params.id
      },
      include: [db.Company]
    })
    .then(function(dbJobs) {
      res.json(dbJobs);
    });
});

//get job skills by job id
router.get("/api/jobskills/:jobid", function(req, res) {
  db.JobSkills
    .findAll({
      where: {
        id: req.params.jobid
      },
      include: [db.Jobs]
    })
    .then(function(dbJobskills) {
      res.json(dbJobskills);
    });
});

//create company
router.post("/api/company", function(req, res) {
  db.Company.create(req.body).then(function(dbCompany) {
    res.json(dbCompany);
  });
});

//create skills for job
router.post("/api/job", function(req, res) {
  db.JobSkills.create(req.body).then(function(dbSkiils) {
    res.json(dbSkiils);
  });
});

// create jobs
router.post("/api/job", function(req, res) {
  db.Jobs.create(req.body).then(function(dbJobs) {
    res.json(dbJobs);
  });
});

//update company
app.put("/api/company", function(req, res) {
  db.Company
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbCompany) {
      res.json(dbCompany);
    });
});

//router.get()
module.exports = router;
