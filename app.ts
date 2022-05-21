// MODULES_______________________________________________________________MODULES

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

// __________________env file for jwt key and database
require('dotenv').config();

const app = express();

// ROUTES_____________________________________ROUTES

const usersRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const auth = require('./middleware/auth');

// _____________all following routes will require checking for authorization
app.use(auth);

app.use(usersRouter);
app.use(messageRouter);
