const express = require('express');
/**
 * Config view engine for app
 */
let configViewEngine = (app)=> {
    app.use(express.static("./public"));
    app.use(express.static(__dirname + '/public'));

    app.set("view engine", "ejs");
    app.set("views","./views");

};

module.exports = configViewEngine;