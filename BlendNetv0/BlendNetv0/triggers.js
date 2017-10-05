'use strict';
var models = require('./models');

var https = require('https');


var file = [];
var request;

var i = -1;
console.log("Entered Triggers");
var ref = models.firebaseDb.ref("hubs/h0");

function onNewLinkAvailable(snapshot) {
    console.log("Detected Trigger");
    //console.log(snapshot);
    var list = snapshot.val();


    
    
    //var link = list[0];
    //var link = "https://blendnet.blob.core.windows.net/resources/TestVid3.mp4";
    //console.log(link);

    downloadFile(list);
      
    
}

function downloadFile(list) {
    var fs = require('fs');
    var request = require('request');
    var progress = require('request-progress');
    //list = { "john": "https://blendnet.blob.core.windows.net/resources/testVid3.mp4" };
    console.log(list);
    if (Object.keys(list).length < 1) return;
    var key = Object.keys(list)[0];
    var link = list[key];
   // link = "https://blendnet.blob.core.windows.net/resources/testVid3.mp4"
    var fileName = link.substring(link.lastIndexOf('/') + 1);
    console.log("Link: " + link + "\t: fileName: " + fileName);

    // The options argument is optional so you can omit it 
    progress(request(link), {
        // throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms 
        // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms 
        // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length 
    })
        .on('progress', function (state) {
            // The state is an object that looks like this: 
            // { 
            //     percent: 0.5,               // Overall percent (between 0 to 1) 
            //     speed: 554732,              // The download speed in bytes/sec 
            //     size: { 
            //         total: 90044871,        // The total payload size in bytes 
            //         transferred: 27610959   // The transferred payload size in bytes 
            //     }, 
            //     time: { 
            //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals) 
            //         remaining: 81.403       // The remaining seconds to finish (3 decimals) 
            //     } 
            // } 
            console.log('progress', state);
        })
        .on('error', function (err) {
            // Do something with err 
            console.log(err);
        })
        .on('end', function () {
            // Do something after request finishes 
            console.log('download complete');
            ref.child("toDownload").child(key).remove();
            delete list[key];
            
            downloadFile(list);
        })
        .pipe(fs.createWriteStream(fileName));

}

ref.on("child_added", onNewLinkAvailable);
ref.on("child_changed", onNewLinkAvailable);

module.exports = "Hello World";
