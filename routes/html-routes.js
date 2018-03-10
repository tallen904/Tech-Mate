const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'))
})

router.get('/employee', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/employee.html'))
})

router.get('/employer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/employer.html'))
})

<<<<<<< HEAD
router.get('/postjob/company=:id/', (req, res) => {
=======
router.get('/postjob', (req, res) => {
>>>>>>> 1188e5eb0f0dcaafd644945b17212c97eafcee56
    res.sendFile(path.join(__dirname, '../public/views/jobposting.html'))
})

router.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/alljobs.html'))
})

router.get('/match/:jobid?', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/match.html'))
})

module.exports = router;
