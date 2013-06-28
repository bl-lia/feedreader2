var mongoose    = require('mongoose')
  , schema      = require('../schema/schema')
  , async       = require('async')
;

function Article(){}

Article.add = function(feed, article, callback){
    var Article = mongoose.model('Article');
    var article = new Article({
        feedId      : feed._id,
        date        : article.date,
        title       : article.title,
        description : article.description,
        summary     : article.summary,
        link        : article.link
    });
    
    article.save(function(err, a){
        if(err) throw err;
        else{
            console.log('Success to save article.');
            if(callback !== undefined)
                callback(a);
        }
    });
};

Article.addAll = function(feed, articles, callback){
    
    var arr = new Array();
    
    async.each(articles, function(article){
        Article.add(article, function(a){
            arr.push(a);
        });
    }, function(err){
        if(err) throw err;
        
        if(callback !== undefined)
            callback(arr);
    });
};
