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
  .get('/:id', authenticate, (req, res, next) => {
    Book.findById({_id: req.params.id})
    .then((book) => {res.json(book);})
    .catch(next);
  })
  //Post new
  .post('/', authenticate, (req, res, next) => {
    new Book(req.body).save()
    .then((book) => {
      if (result.buildingId) {
        Building.findById(result.buildingId)
        .then((building) => {
          building.books.push(book._id);
          building.save();
        });
      }
      return result;
    })
    .then((book) => {res.json(book);});
  })
  //Update existing
  .put('/:id', authenticate, (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}) //Haven't written these. Consult.
    .then(updated => {res.json(updated);}) //This gets the non-updated version. Why? Mongoose docs indicate this is intended behavior but I hate it.
    .catch(next);
  })
  //Delete one
  //TODO: Stick this route behind role verification.
  .delete('/:id', authenticate, (req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
    .then(deleted => {res.json(deleted);})
    .catch(next);
  });
