const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        //split the token when the space is there depend upon  the declaration. we need the 1st part so it mention 1.
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                next (Error('Faild to authorizarion token.'))
            }else{
                req.decoded = decoded;
                next();
            }
        });
    
    } else {
        next (Error('No token Provided'));
    }
}