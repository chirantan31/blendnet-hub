'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    models.resource.findAll().then(function (resources) {
        res.json(resources);
    })
});

router.post('/create', function (req, res) {

    models.resource.create({
        fileName: req.body.fileName,
        link: req.body.link
    }).then(function () {
        res.redirect('/');
    });
});

router.get('/request', function (req, res) {

    var resId = req.query.id;
    models.resource.findAll({ where: { Id: resId }, attributes: ['link'] })
        .then(function (resources) {
            var resLink = resources[0].link;

            var ref = models.firebaseDb.ref("hubs/h0/toDownload");

            ref.push().set(resLink);


            //// Attach an asynchronous callback to read the data at our posts reference
            //ref.once("value", function (snapshot) {
            //    var currentDownloadList;
            //    if (snapshot.val() == null)
            //        currentDownloadList = [];
            //    else
            //        currentDownloadList = snapshot.val();

            //    currentDownloadList.push(resLink);
            //    ref.update(currentDownloadList);

            //    res.json("Bye");
            //}, function (errorObject) {
            //    console.log("The read failed: " + errorObject.code);
            //});
            res.json("Successful");
        });


});


module.exports = router;
