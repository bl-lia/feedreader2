var getIndex = exports.getIndex = function(req, res){
    res.send('getIndex');
};

exports.index = function(req, res){
    if(req.params.method === 'getIndex'){
        getIndex(req, res);
    }
};
