'use strict';
var express = require('express');
var router = express.Router();

//var admin = require("firebase-admin");

//var serviceAccount = require("../blendnet-msr-firebase-adminsdk-8koqp-6368a28ac6.json");

//admin.initializeApp({
//    credential: admin.credential.cert(serviceAccount),
//    databaseURL: "https://blendnet-msr.firebaseio.com"
//});

//var database = admin.database();
//var ref = database.ref("/");
var models = require('../models');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//router.get('/resource', function (req, res) {
//    ref.on("child_changed", function (data) {
//        var player = data.val();
//        res.send('respond with a resource');
//    });

//});

router.get('/firebaseDb', function (req, res) {
    var ref = models.firebaseDb.ref("/");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function (snapshot) {
        res.json(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

module.exports = router;
