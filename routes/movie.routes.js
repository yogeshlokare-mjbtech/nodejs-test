const express = require('express')
const router = express.Router()
const userController = require('../controllers/movie.controller');

// Retrieve all movies
router.get('/movies', userController.findAll);

// Add a new movie in DB
router.post('/movie', userController.create);

// Retrieve a movie user with id From DB
router.get('/movie/:id', userController.findOne);

//POST multipl entries of Movie
router.post('/movies', userController.addMany);

module.exports = router

