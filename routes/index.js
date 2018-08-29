var express = require('express');
//var router = express.Router();
var app = express();
let regNumFactory = require('../public/js/registrationPlates');

// /* GET home page. */
// app.get('/', async function(req, res) {
//   res.render('home');
// });

// app.get('/reg_numbers',async function(req,res){
//   let {regValue} = req.body;
//   console.log(regValue);
//   console.log("Here!!");
//   res.render('home');
// });

// app.post('/reg_numbers',async function(req,res){
  
  
//   res.render('home');
// });


// app.post('/reg_numbers', async function(req,res)
// {
//     try{

//       let {regValue} = req.body;
//       console.log(regValue);

//       let regNumber = await regNumFactory.enterRegPlate(regValue);

//       let checkReg = await regNumFactory.getPlate();

//       console.log(checkReg);

//     }
//     catch(error){

//     }
// })

module.exports = app;
