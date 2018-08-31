var express = require('express');
var path = require('path');


var bodyParser = require('body-parser');

var routes = require('./routes/index');

let regNumFactory = require('./public/js/registrationPlates');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/reg_numbers', routes);

//Database Connection ...
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;

if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/reg_numb';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let regNumbers = regNumFactory(pool);

app.get('/', async function(req, res) {

    try{
        let displayRegs =  await regNumbers.getPlate();
        res.render('home', {displayRegs});
    }
    catch(error){

    }

  });


  app.post('/reg_numbers', async function(req,res){
    try{

        let {regValue} = req.body;
         await regNumbers.enterRegPlate(regValue);
        let showPlates =  await regNumbers.getPlate();
        let displayRegs = showPlates.reverse();

        res.render('home', {displayRegs});
    }
    catch(error){

    }
  });


  app.get("/reset", async function(req,res){
    try{
        let deleteRegNumbs = await regNumbers.resetDataBase();

        //Need to add a flash message indicating that the DB has been resetted.
        res.redirect("/");
    }
    catch(error){
        res.redirect("/");
    }
})

//configure the port number using and environment number
var portNumber = process.env.PORT || 3313;

//start everything up
app.listen(portNumber, function () {
    console.log('Registration Numbers:', portNumber);
});