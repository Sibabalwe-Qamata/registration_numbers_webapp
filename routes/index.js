var express = require('express');
//var router = express.Router();
var app = express();

/* GET home page. */
app.get('/', function(req, res) {
  res.render('home');
});


async function add(req, res, next) {
  try {
    let input = req.body;
    await categoryService.add(input);
    res.redirect('/categories');
  }
  catch (err) {
    next(err)
  }
};


async function get(req, res, next) {
  try {
    var id = req.params.id;
    //let result = await categoryService.get(id);
    res.render('categories/edit', {
      page_title: "Edit Customers - Node.js",
      data: result.rows[0]
    });
  }
  catch (err) {
    next(err);
  }
};

module.exports = app;
