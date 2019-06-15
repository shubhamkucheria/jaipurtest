const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// my vars
const port = process.env.PORT || 3000;
const {MONGO_URL} = require('./config/');

// configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// static files
app.set('view engine', 'ejs');
// routes
app.use(require('./routes/')); // main routes
app.use('/auth', require('./routes/user')); // user routes
// run server
server.listen(port, () => console.info(`App running on port ${port}`));
