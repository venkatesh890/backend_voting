const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req,res,next)=>{
try {
    const user = await db.User.create(req.body);
    const {id, username} = user;
    const token = jwt.sign({id,username},process.env.SECRET);
    res.status(201).json({id,username,token});//201 status for server run successful
    // res.json(user);

} catch (err) {
    if(err.code === 11000){ //11000 for having the same username
        err.message = 'Sorry,that username is already taken'
    }
    next(err);
}
}
//boiler plate of trycatch
exports.login = async(req,res,next)=>{
    try {
        const user = await db.User.findOne({ username: req.body.username});
        const {id, username}=user;
        
        const valid = await user.comparePassword(req.body.password);

        if (valid) {
            const token = jwt.sign({id,username},process.env.SECRET);
            res.json({
                id,
                username,
                token
            });

        }else{
            throw new Error();
        }
    } catch (err) {
        err.message = 'Invalid Username/Password';
        next(err);
    }
}