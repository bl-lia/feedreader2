
/**
 * Module dependencies.
 */

var express     = require('express')
  , routes      = require('./routes')
  , user        = require('./routes/user')
  , http        = require('http')
  , path        = require('path')
  , socketio    = require('socket.io')
  , passport    = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);

var events = require('./modules/events')
  , api         = require('./routes/api');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var user = {id:'111', username: 'aaaaa'};
    done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
      var user = {id: '111', username: 'name'};
      done(null, user);
  }
));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api/:method', api.index);
app.get('/login', function(req, res){res.render('login');});
app.post('/login', passport.authenticate('local'), function(req, res){console.log('aaaaa');});

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

server.listen(app.settings.port,
              function(){
                  console.log('Express server listening on port %d with socket.io', app.settings.port);
              });

