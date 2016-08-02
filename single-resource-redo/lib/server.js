const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = ('./config');
const User = require('./models/user');

//Configure the server
require('./mongoose-setup');
app.set('secret', config.secret);

//Use the body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//use morgan to log requests in the console
app.use(morgan('dev'));

//Routing
app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;
