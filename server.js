const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      cors = require("cors"),
      morgan = require("morgan");
      bluebird = require('bluebird');

// configuration ===============================================================
const config = require("./config/config.js");
mongoose.Promise = bluebird;
mongoose.connect(config.db.url, config.db.options); // connect to our database

// set up our express application
var app = express();
    app.use(bodyParser.json()) // get information from html forms
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use(morgan("dev"))

// routes ======================================================================
require("./app/routes.js")(app); 

// launch ======================================================================
port = process.env.PORT || config.port;
app.listen(port);
console.log("The server is running on port " + port);
