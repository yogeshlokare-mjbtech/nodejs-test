const Movie = require('../models/movie.model.js');

exports.findAll = (req, res) => {
    const name = req.query.query;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Movie.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving movies."
            });
        });
};

// Add and Save a new Movie
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Add a new Movie
    const movie = new Movie({
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
    });
    // Save movie in the database
    movie.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while adding new movie."
            });
        });
};

// Insert and Save a Movie LIST
exports.addMany = (req, res) => {

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            let value = req.body[key];
            console.log(`value for ${key} is ${value.name}`)
            // Add a new Movie
            let movie = new Movie({
                name: value.name,
                year: value.year,
                director: value.director,
            });
            // Save movie in the database
            movie.save()
                .then(data => {
                   console.log("inserted");
                   res.send({
                       message: "Successfully added multiple movies."
                   });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something went wrong while adding movie list."
                    });
                });
        }
    }
};

// Find a single Movie with a id
exports.findOne = (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting movie with id " + req.params.id
            });
        });
};