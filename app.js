
/**
 * Module dependencies.
 */

var express     = require('express')
  , routes      = require('./routes')
  , user        = require('./routes/user')
  , api         = require('./routes/api')
  , http        = require('http')
  , path        = require('path')
  , socketio    = require('socket.io')
  , passport    = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

//var app = express();
var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use(new LocalStrategy(
        function(username, password, done){
            return done(null, 'aaa');
        }
    ));

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

