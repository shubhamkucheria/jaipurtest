const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// my vars
const port = process.env.PORT || 3000;
const {MONGO_URL} = 'mongodb://testjpr:testjpr@testjpr-shard-00-00-mcnbk.mongodb.net:27017,testjpr-shard-00-01-mcnbk.mongodb.net:27017,testjpr-shard-00-02-mcnbk.mongodb.net:27017/testjpr?ssl=true&replicaSet=testjpr-shard-0&authSource=admin&retryWrites=true&w=majority';

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
