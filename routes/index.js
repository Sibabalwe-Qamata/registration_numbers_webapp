var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
app.get('/', function(req, res) {
  res.render('home');
});

module.exports = app;
