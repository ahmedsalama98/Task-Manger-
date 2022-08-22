const express = require('express')
const User =require('../model/user')

const userRoutes = new express.Router()



userRoutes.post('/user',(req,res)=>{

    const body = req.body
    console.log(body)
    const user = new User(body)

    user.save()
    .then((res)=> res.status(200).send(res))
    .catch(err=> res.status(400).send(err))
})




module.exports = userRoutes;




