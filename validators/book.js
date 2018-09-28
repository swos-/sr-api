const Joi = require('joi');

const schema = {
    title: Joi.string().min(1).required(),
    author: Joi.string(),
    genres: Joi.array().items({
        key: Joi.string(),
        label: Joi.string()
    }),
    description: Joi.string().min(250),
    isbn_ten: Joi.number().min(10),
    isbn_thirteen: Joi.string().min(13),
    format: Joi.string().min(4),
    pages: Joi.number().integer().min(1)
};

module.exports = schema;