const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = ('./config');

const router = express.Router();

module.exports = router
  .use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          return res.json({success: false, message: 'Authentication failed. Token invalid.'});
        } else {
          //If authentication passes, save to request for use in other routes.
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //We're here if no token was passed to a protected route.
      return res.status(403).send({success: false, message: 'No token passed.'});
    }
  })
  .get('/', (req, res, next) => {
    User.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  })
  .post('/authenticate', (req, res, next) => {
    User.findOne({name: req.body.name})
    .then((user) => {
      if (!user) {
        res.json({success: false, message: 'Authentication failed. No such user.'});
      } else if (user) {
        if (user.password != req.body.password) {
          res.json({success: false, message: 'Authentication failed. Wrong password.'});
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
