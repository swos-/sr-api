const Joi = require('joi');
const Author = require('../models/author');
const authorSchema = require('../validators/author');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function getAuthors(req, res) {
    try {
    const authors = await Author
        .find()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, bio: 1 });

        res.status(200).send(authors);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function getAuthorById(req, res) {
    try {
    const id = new ObjectId(req.params.id);
    const author = await Author
        .findById(id)
        .select({ name: 1, bio: 1 });
        res.status(200).send(author);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function createAuthor(req, res) {
    const { error } = validateAuthor(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const author = new Author(req.body);
    try {
        const result = await author.save();
        res.status(201).send(result);
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

async function deleteAuthor(req, res) {
    try {
        const id = new ObjectId(req.params.id);
        const result = await Author.deleteOne({ _id: id });
        res.status(204).send();
    }
    catch (exception) {
        res.status(500).send('something went wrong');
    }
}

function validateAuthor(author) {
    return Joi.validate(author, authorSchema);
}

module.exports = {
    createAuthor,
    deleteAuthor,
    getAuthors,
    getAuthorById
}