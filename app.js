// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const knex = Knex(knexConfig.development);
Model.knex(knex);
const expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app);
