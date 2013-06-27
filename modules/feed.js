var mongoose    = require('mongoose')
  , FeedParser  = require('feedparser')
  , request     = require('request')
    ;

mongoose.connect('mongodb://localhost/feedreaderdb');
mongoose.connection.on('error', function(err){
    console.error('error occurred');
    throw err;
});

function Feed(){}

Feed.loadTest = function(xmlUrl, callback){
    request(xmlUrl)
        .pipe(new FeedParser())
        .on('readable', callback);
    
};

Feed.save = function(){
    
};

Feed.load = function(){
    var Feed = mongoose.model('Feed');
    Feed.findById(new mongoose.Types.ObjectId(this.id), function(err, feed){
        if(err) throw err;
        else{
            if(feed.xmlUrl !== null)
                request(feed.xmlUrl)
                    .pipe(new FeedParser())
                    .on('readable', function(){
                        var stream = this, item;
                        while(item = stream.read()){
                        }
                    });
        }
    });
};

exports = module.exports = Feed;