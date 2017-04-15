var express = require('express');
var bodyParser = require('body-parser');
// authentication
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;
var nav = [{
    Link: '/books',
    Text: 'Books'
}, {
    Link: '/authors',
    Text: 'Authors'
}, {
    Link: '/auth/profile',
    Text: 'Profile'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

/* SESSIONS CONFIGURATION
  ----------------------------------------- */
app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: true
}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Login',
        nav: nav
    });
});

// app.get('/books', function(req, res) {
//     res.send('books');
// });

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
