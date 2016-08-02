const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Models
const User = require('./models/user');

//Routes
const users = require('./routes/users');

//Configure the server
require('./mongoose-setup');

//Use the body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//use morgan to log requests in the console
app.use(morgan('dev'));

//Routing

app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Create sample User
app.get('/setup', (req, res) => {
  var john = new User({
    name: 'John Smith',
    password: 'secret',
    admin: true
  });

  john.save()
  .then(() => {
    res.json({ success: true});
  })
  .catch((err) => {
    if (err) throw err;
  });
});

module.exports = app;
