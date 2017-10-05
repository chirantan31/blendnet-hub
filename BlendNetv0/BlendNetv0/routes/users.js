'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

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

router.get('/queryFile', function(req,res){
    var file = {
        ID:1263,
        name:"Chirantan",
        md5:"EREREERERE"        
    };
    models.file.create(file).then(function(){
        console.log("Hello");
    });
});


router.get('/GetReq',function(req,res){
    
    var options = {  
    url: 'http://111.221.92.19:3976/users/getFileDetails/1',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'serverVersion=22'
    }
};

request(options, function(err, res, body) {
    var files = JSON.parse(body);
    files.forEach(function(item){
        models.file.create(item);
    });    
});

});

module.exports = router;
