"use strict";
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var file = sequelize.define('file', {
        ID: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        name: Sequelize.STRING,
        md5: Sequelize.STRING.BINARY,
        size: Sequelize.BIGINT,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        link: Sequelize.STRING
    });

    file.sync();
    return file;
};