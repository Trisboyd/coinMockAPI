// MODULES_______________________________________________________________MODULES

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

// __________________env file for jwt key and database
require('dotenv').config();

const app = express();