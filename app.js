var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var apis = require('./routes/api');
// var users = require('./routes/users');

var app = express();

var session = require('express-session');

try{
  var nodeadmin = require('nodeadmin');
  app.use(nodeadmin(app));

}
catch(e){

}





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser());

app.use( session({ 
	secret: 'lobubble',
	name:   'lobubble',
	// store:  new RedisStore({
	// 	host: '127.0.0.1',
	// 	port: 6379
	// }),
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));


var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

app.use(passport.initialize());
app.use(passport.session());  




// app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));




passport.use(new FacebookTokenStrategy({
    clientID: "206469993192597",
    clientSecret: "a0b5f9955a5e9f8a24b45adc0326ff3f"
  }, function(accessToken, refreshToken, profile, done) {
    
    var user = {
        'email': profile.emails[0].value,
        'name' : profile.name.givenName + ' ' + profile.name.familyName,
        'id'   : profile.id,
        'token': accessToken
    }

    return done(null, profile); // the user object we just made gets passed to the route's controller as `req.user`

  }
));


passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



app.get('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    // do something with req.user 
    console.log(req.user);
    res.send(req.user);
  }
);





app.use('/', routes);
app.use('/api/', apis);
app.use('/api/v1', apis);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
