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

router.get('/postjob', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/jobposting.html'))
})

router.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/alljobs.html'))
})

router.get('/match', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/match.html'))
})

module.exports = router;
