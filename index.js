require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const paginate = require('./middleware/paginate');
const books = require('./routes/books');
const authors = require('./routes/authors');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(paginate(process.env.PAGE_LIMIT, process.env.PAGE_MAX));
app.use(morgan('tiny'));
app.use('/v1/books', books);
app.use('/v1/authors', authors);

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        authdb: process.env.MONGO_AUTH_DB
    }
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(port, () => console.log(`listening on port ${port}`));
