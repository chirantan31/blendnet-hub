var admin = require("firebase-admin");
var serviceAccount = require("/home/pi/BlendNet/blendnet-msr-firebase.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://blendnet-msr.firebaseio.com"
	});
var database = admin.database();
var ref = database.ref("/");
ref.on("child_changed", function(data) {
   var player = data.val();
   console.log("The updated player name is " + player.name);
});
