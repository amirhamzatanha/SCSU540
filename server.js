const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectFlash =require('connect-flash');
const session = require ('express-session');
const passport= require('passport');
const initWebRoutes = require('./config/router');
const app = express();
const configViewEngine = require('./config/viewEngine');




//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(express.urlencoded({ extended: false}));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));


/*




if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport= require('passport');
const flash =require('express-flash');
const session = require ('express-session');
const methodOverride = require('method-override');
const mysql = require('mysql');
const connection = require('./config/dbconnect');


const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id == id)

);


const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session(
    {
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));


app.delete('/logout', (req,res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
    console.log(req.user.name);

    
});

app.get('/login', checkNotAuthenciated, (req,res) => {
    res.render('login.ejs')

});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true})
);


app.get('/register',(req,res) => {
    res.render('register.ejs')
});




app.post('/register', async (req,res) => {
    
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        connection.query("insert into users (id,fName,lName,email,designation,password) values ('" + Date.now().toString() + "','" + req.body.fName + "','" + req.body.lName + 
        "','" + req.body.email + "','" + req.body.designation + "','" + hashedPassword + "')" , 
        (error, rows) => {
            if(error) throw error;
            if(!error) {
                console.log(rows);
            }
        });

    res.redirect('/login');

    }
    catch {
        res.redirect('/register');
    }
    console.log(users);
});

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

function checkNotAuthenciated (req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

app.listen(3000);

*/