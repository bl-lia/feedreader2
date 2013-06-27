var events = require('../modules/events')
  , feed    = require('../modules/feed')
  , feedreader = require('../modules/feedreader')
;

function ApiMethod(){}

ApiMethod.getIndex = function(req, res){
    res.send('getIndex');
};

ApiMethod.fetch = function(req, res){
    feed.loadTest('http://ggsoku.com/feed/', function(){
        var stream = this, item, response;
        while(item = stream.read()){
            response = response + ";" + "aaaaa";
            console.log(item.title);
        }
        
        res.send(response);
    });
};

ApiMethod.test = function(req, res){
    feedreader.feed.add('http://ggsoku.com/feed/', function(){console.log('lkjlkjlkj');});
};

exports = module.exports = ApiMethod;

exports.index = function(req, res){
    if(req.params.method === 'getIndex'){
        ApiMethod.getIndex(req, res);
    }else if(req.params.method === 'fetch'){
        ApiMethod.fetch(req, res);
    }else if(req.params.method === 'test'){
        ApiMethod.test(req, res);
    }
};
