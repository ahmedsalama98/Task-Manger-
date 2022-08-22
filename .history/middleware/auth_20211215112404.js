const jwt =require('jsonwebtoken')
const User =require('../model/user')


const auth = async(req,res,next)=>{

    try{

        const token = req.header('Authorization').replace('Bearer ','')

        const decode = jwt.verify(token, 'ahmed')

        const user = await User.findOne({_id:decode._id, tokens:token})
     
        req.user = user;
        next()
    }catch(e){

        req.status(401).send('Please Authonticate')
    }
}

module.exports =auth;