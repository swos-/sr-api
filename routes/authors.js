const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAuthors);

router.get('/:id', authorController.getAuthorById);

router.post('/', authorController.createAuthor);

router.delete('/:id', authorController.deleteAuthor);

module.exports = router;