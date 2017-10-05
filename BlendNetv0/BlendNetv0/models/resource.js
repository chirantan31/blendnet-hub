"use strict";
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var resource = sequelize.define('resource', {
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        fileName: Sequelize.STRING,
        link: Sequelize.STRING        
    });

    resource.sync();
    return resource;
};