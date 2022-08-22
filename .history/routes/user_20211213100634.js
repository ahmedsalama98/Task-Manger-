const express = require('express')
const User =require('../model/user')

const userRoutes = new express.Router()



userRoutes.post('/user',(req,res)=>{

    const body = req.body
    console.log(body)
    // const user = new User(body)

    // user.save()
    // .then((res)=>console.log(res,'Done'))
    // .catch(err=> console.log(err))
    res.send(req.name)
})




module.exports = userRoutes;




