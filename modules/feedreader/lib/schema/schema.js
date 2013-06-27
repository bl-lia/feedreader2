var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
;

var Feed = new Schema({
        _id      : Schema.Types.ObjectId,
        name     : String,
        link     : String,
        xmlUrl   : String
    });

mongoose.model('Feed', Feed);