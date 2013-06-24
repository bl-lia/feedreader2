var passport        = require('passport')
  , LocalStrategy   = require('passport-local').Strategy;

passport.use(new LocalStrategy(
        function(username, password, done){
            console.log('authentication');
            
            return done(null, 'aaa');
        }
    ));
    
exports.index = function(req, res){
    res.render('login');
};

exports.postLogin = function(req, res, next){
    console.log('authenticate1');
    passport.authenticate('local', function(err, user, info){
        console.log('authenticate');
    });
};

