var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
let routes = require('./routes');
let regNumFactory = require('./registration_plates');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        selectTowns: function () {
            if (this.checked) {
                return "selected";
            }

        }
    }
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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
let regRoutes =routes(regNumbers);

//----------Flash Messanging -------------//
const flash = require('express-flash');
const session = require('express-session');
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', regRoutes.show);
app.post('/reg_numbers', regRoutes.showAdd);
app.get('/filter/:townTag', regRoutes.filter);
app.get('/reset', regRoutes.reset);

//configure the port number using and environment number
var portNumber = process.env.PORT || 3313;

//start everything up
app.listen(portNumber, function () {
    console.log('Registration Numbers:', portNumber);
});