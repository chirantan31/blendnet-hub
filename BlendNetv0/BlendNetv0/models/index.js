"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
env = "Pi";
var sequelize;
if (env == "Server") {
    sequelize = new Sequelize('BlendNetdbv0', 'myadmin', 'Test123!', {
        host: 'blendnet.database.windows.net',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            encrypt: true
        }
    });
}
else if (env == "Pi"){
    sequelize = new Sequelize('BlendNetdbv0', 'myadmin', 'Test123!', {
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            encrypt: true
        },
        storage: "local.sqlite"
    });
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});





db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Firebase Setup

var admin = require("firebase-admin");

var serviceAccount = require("../blendnet-msr-firebase-adminsdk-8koqp-6368a28ac6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://blendnet-msr.firebaseio.com"
});

var firebaseDb = admin.database();
var ref = firebaseDb.ref("/");




db.firebaseDb = firebaseDb;



module.exports = db;
