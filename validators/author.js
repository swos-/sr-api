const Joi = require('joi');

const schema = {
    name: Joi.string().min(1).required(),
    bio: Joi.string().min(50)
}

module.exports = schema;