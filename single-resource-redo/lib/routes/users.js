const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const User = require('../models/user');

const router = express.Router();

module.exports = router
  .get('/', (req, res, next) => {
    User.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  })
  .post('/authenticate', (req, res, next) => {
    User.findOne({name: req.body.name})
    .then(() => {})
    .catch(next);
  });
