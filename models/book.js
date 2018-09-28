const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    average_rating: Number,
    num_ratings: Number,
    num_reviews: Number,
    cover_image: String,
    format: String,
    pages: Number,
    isbn_ten: Number,
    isbn_thirteen: String,
    genres: [
        { key: String, label: String }
    ]
});

module.exports = mongoose.model('Book', bookSchema);