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
  })
  //Get one
  .get('/:id', authenticate, (req, res, next) => {
    Building.findById({_id: req.params.id})
    .then((building) => {res.json(building);})
    .catch(next);
  })
  //Post new
  .post('/', authenticate, (req, res, next) => {
    new Building(req.body).save()
    .then((building) => {res.json(building);});
  })
  //Update existing
  .put('/:id', authenticate, (req, res, next) => {
    Building.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
    .then(updated => {res.json(updated);})
    .catch(next);
  })
  //Delete one
  //TODO: Stick this route behind role verification.
  .delete('/:id', authenticate, (req, res, next) => {
    Building.findByIdAndRemove(req.params.id)
    .then(deleted => {res.json(deleted);})
    .catch(next);
  });
