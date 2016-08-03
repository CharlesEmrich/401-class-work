const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');

const Book = require('../models/book');
const authenticate = require('../auth/authenticate')();

const router = express.Router();

module.exports = router

  //Get all
  .get('/', authenticate, (req, res, next) => {
    Book.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  })
  //Get one

  //Post new
  .post('/', authenticate, (req, res, next) => {
    new Book(req.body).save()
    .then((book) => {res.json(book);});
  })
  //Update existing

  //Delete one
  //TODO: Stick this route behind role verification.
