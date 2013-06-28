var mongoose    = require('mongoose')
  , FeedParser  = require('feedparser')
  , request     = require('request')
  , schema      = require('../schema/schema')
    ;

function Feed(){
}

Feed.add = function(feedUrl, callback){
    request(feedUrl)
        .pipe(new FeedParser())
        .on('meta', function(meta){
            var Feed = mongoose.model('Feed');
            var feed = new Feed({
                _id  : new mongoose.Types.ObjectId,
                name : meta.title,
                link : meta.link,
                xmlUrl : meta.xmlUrl !== null ? meta.xmlUrl : feedUrl
            });
            
            console.log('Add feed. %s - %s - %s', meta.title, meta.link, meta.xmlUrl);
            
            feed.save(function(err, f){
                if(err) throw err;
                else{
                    console.log('Success to save feed.');
                    if(callback !== undefined)
                        callback(f);
                }
            });
        });
};

Feed.fetch = function(){
    
};

Feed.test = function(){
    console.log('eeeeeee');
};

exports = module.exports = Feed;