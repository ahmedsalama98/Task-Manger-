const jwt =require('jsonwebtoken')
const User =require('../model/user')


const auth = async(req,res,next)=>{

    try{

        const token = req.header('Authorization').replace('Bearer ','')

        console.log(token)
        const decode = jwt.verify(token, 'ahmed')
        console.log(decode)


        const user = await User.findOne({_id:decode._id, tokens:token})
        next()
    }catch(e){

    }
}

module.exports =auth;