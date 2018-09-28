const Joi = require('joi');
const Book = require('../models/book');
const bookSchema = require('../validators/book');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function createBook(req, res) {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const book = new Book(req.body);
    try {
        const result = await book.save();
        res.status(201).send(result);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function getBooks(req, res) {
    try { 
        const books = await Book
            .find()
            .populate('author', 'name bio -_id')
            .limit(10)
            .sort({ title: 1 })
            .select({ title: 1, isbn_ten: 1, description: 1, pages: 1, author: 1, genres: 1 });

        res.status(200).send({
            books: books,
            page: res.locals.pagination.page,
            page_size: res.locals.pagination.page_size
        })
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function getBookById(req, res) {
    try {
    const id = new ObjectId(req.params.id);
    const book = await Book
        .findById(id)
        .select({ title: 1, isbn_ten: 1, description: 1, pages: 1, author: 1, genres: 1 });

        res.status(200).send(book);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function updateBook(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const record = req.body;
        const result = await Book.update({ _id: id }, record);
        res.status(200).send(result);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function deleteBook(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const result = await Book.deleteOne({ _id: id });
        res.status(204).send();
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

function validateBook(book) {
    return Joi.validate(book, bookSchema);
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
}