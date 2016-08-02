const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authenticate = require('../auth/authenticate')();

const router = express.Router();

module.exports = router

  .get('/', authenticate, (req, res, next) => {
    User.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  })
  .post('/requestToken', (req, res, next) => {
    User.findOne({name: req.body.name})
    .then((user) => {
      if (!user) {

        next({status: 403, message: 'Authentication failed. No such user.'});
      } else if (user) {
        if (user.password != req.body.password) {

          next({status: 403, message: 'Authentication failed. Wrong password.'});
        } else {
          //We're here if the user exists and password is correct.
          //So, let's make a token.
          let token = jwt.sign(user, process.env.secret);
          res.json({success: true, message: 'Token Issued!', token});
        }
      }
    })
    .catch(next);
  });
