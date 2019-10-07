module.exports = {
    ...require('./auth'),//spread
    ...require('./poll')
}
module.exports.notFound = (res,req,next)=>{
    const err=new Error ('NOT FOUND');
    err.status=404;
    next(err);
}

module.exports.errors = (err,req,res,next)=>{
    res.status(err.status || 400).json({
        err:err.message || "something went wrong"
    })
};