'use strict';

// Importing Node modules and initializing Express
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main');

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Database Connection
//mongoose.connect(config.database); 
mongoose.Promise = global.Promise;
mongoose.connect(config.database.dbStr, config.database.dbOptions)
    .then(result => console.log('connected to mongodb successfully.'))
    .catch(err => console.log('Error while connecting to mongodb: ' + err + ''));


const router = require('./router');
router(app);

//start the server
const server = app.listen(config.port);
console.log('Your api is running on port ' + config.port);