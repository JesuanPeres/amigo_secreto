const express = require('express');

const Router = express.Router();
const HomeController = require('./controllers/HomeController');


Router.get('/', HomeController.index);

Router.post('/sortear', HomeController.sortear);

module.exports = Router;