// MODULES_______________________________________________________________MODULES

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

// __env file for jwt key and database
require('dotenv').config();

console.log(process.env.NODE_ENV);

const { PORT = 3000 } = process.env;
const { MONGODB_URI } = process.env;

//__connect to mongo database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// __Log requests and errors
// const { requestLogger, errorLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/userExistsError');

const { notFoundError } = require('./middleware/errors/notFoundError');

// APP SETUP___________________________________APP SETUP
const app = express();

app.use(cors());
app.options('*', cors());

// for proxy service Heroku
app.set('trust proxy', 1);

// Setup for app
app.use(express.json());

app.use(express.urlencoded());

// testing function for server crash and pm2 restart
app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Server will crash now');
    }, 0);
});

// ROUTES__________________________________________________ROUTES

const usersRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const auth = require('./middleware/auth');
const { login, signup } = require('./controllers/users');

// log all requests
// app.use(requestLogger);

// non authorization routes

app.post('/signin', login);
app.post('/signup', signup);

// all following routes will require checking for authorization
app.use(auth);

app.use(usersRouter);
app.use(messageRouter);

// all unspecifed routes will return an error
app.get('*', () => {
    throw new notFoundError('Requested resource not found');
});

// ERRORS_____________________________________________________________________________ERRORS

// log all errors with Winston
// app.use(errorLogger);

// error handler for sending errors to the client produced by celebrate
app.use(errors());

app.use(errorHandler);

// listen for correct port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

