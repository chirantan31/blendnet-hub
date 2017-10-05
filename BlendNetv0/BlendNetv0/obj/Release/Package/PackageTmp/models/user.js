"use strict";
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        DevId: Sequelize.TEXT
    });
    
    
    return User;
};