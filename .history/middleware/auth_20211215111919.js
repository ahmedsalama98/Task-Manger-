const jwt =require('jsonwebtoken')


const auth = async(req,res,next)=>{

    try{

        const token = req.header('Authorization').replace('Bearer ','')

        console.log(token)
        const decode = jwt.verify(token, 'ahmed')
        console.log(decode)


        const user = User.fin
        next()
    }catch(e){

    }
}

module.exports =auth;