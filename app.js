
/**
 * Module dependencies.
 */

var express     = require('express')
  , routes      = require('./routes')
  , user        = require('./routes/user')
  , api         = require('./routes/api')
  , login       = require('./routes/login')
  , http        = require('http')
  , path        = require('path')
  , socketio    = require('socket.io');

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api/:method', api.index);
app.get('/login', login.index);
app.post('/login', login.postLogin);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

server.listen(app.settings.port,
              function(){
                  console.log('Express server listening on port %d with socket.io', app.settings.port);
              });

