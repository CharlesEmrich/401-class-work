const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');

const Building = require('../models/building');
const authenticate = require('../auth/authenticate')();

const router = express.Router();

module.exports = router

  //Get all
  .get('/', authenticate, (req, res, next) => {
    Building.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  });
  //Get one

  //Post new

  //Update existing

  //Delete one
  //TODO: Stick this route behind role verification.
