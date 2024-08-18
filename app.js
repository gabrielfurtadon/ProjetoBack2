var express = require('express');
var path = require('path');
const Auth = require( './helpers/Auth.js')
require('dotenv').config({ path: '.env.postgres' });
var indexRouter = require('./controller/index')
const User = require('./model/User.js')

var app = express();
LoginRouter = require('./controller/autenticacao.js')
UserRouter = require('./controller/UserController.js')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter)
app.use('/', LoginRouter)
app.use('/user', UserRouter)
User.sync()

module.exports = app;