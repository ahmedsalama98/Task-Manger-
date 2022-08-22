const jwt =require('jsonwebtoken')


const auth = async(req,res,next)=>{

    try{

        const token = req.header('Authorization').replace('Bearer ','')

        console.log(token)
        next()
    }catch(e){

    }
}