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
    defaultLayout: 'main',
    helpers :
    {
        selectTowns: function()
        {
            if(this.checked){
                return "selected";
            }
      
        }
    } 
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


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

//----------Flash Messanging -------------//
const flash = require('express-flash');
const session = require('express-session');
// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//-----------------------------------------///

app.get('/', async function(req, res) {

    try{
        let displayRegs =  await regNumbers.getPlate();
           let drop_down = await regNumbers.dropDown();
        res.render('home', {displayRegs,drop_down});
    }
    catch(error){

    }

  });
  app.post('/reg_numbers', async function(req,res)
  {
    try{
        let {regValue} = req.body;
        if(regValue == "")
        {
            req.flash('info', 'Please enter a registration number e.g(CA 142-0144/CAW 5846)!');
            res.redirect("/");  
        }
        let town_locator = regValue.slice(0,3).toUpperCase().trim();
         await regNumbers.enterRegPlate(regValue, town_locator);
         let normalList = await regNumbers.getPlate();
         let displayRegs = normalList.reverse();
        res.render('home', {displayRegs});
    }
    catch(error){
    }
  });

  app.get('/filter/:townTag', async function(req, res)
  {
    try
    {
        let {townTag} = req.params;
        let displayRegs=  await regNumbers.filterTown(townTag);
        let drop_down = await regNumbers.dropDown(townTag);
   

        res.render("home", {displayRegs,drop_down});
        // if (displayRegs.length != 0)
        // {
        //     res.render("home", {displayRegs,drop_down});
            
        // }
        // else{
        //     req.flash('info', 'Town selected is not found!');
        // }
        
    }
    catch(error)
    {

    }
  });
  
  app.get("/reset", async function(req,res){
    try{
        let deleteRegNumbs = await regNumbers.resetDataBase();

        //Need to add a flash message indicating that the DB has been resetted.
        req.flash('info', 'The database has just been cleared!');
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