const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: String,
    year: Number,
    director: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);