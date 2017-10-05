'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {

    res.json({ boy: "john" });
});

router.post('/create', function (req, res) {
    
    models.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DevId: req.body.devId

    }).then(function () {
        res.redirect('/');
    });
});


module.exports = router;
