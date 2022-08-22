const express = require('express')
const User =require('../model/user')

const userRoutes =  express.Router()



userRoutes.post('/user',(req,res)=>{

    const body = req.body
    console.log(req.body)
    const user = new User(body)
    user.save()
    .then((res)=> res.status(200).send(res))
    .catch((err)=> res.status(400).send(err))
})
userRoutes.get('/users/:id', (req,res)=>{

    console.log( req.name)
    const _id = req.params.id
    User.findById(_id)
    .then((user)=>{
        if(!user){
            return res.status(404).send('Not Found')
        }

     
        res.status(200).send(user)
    })
    .catch(e=> res.status(500).send(e))
})

userRoutes.get('/users',(req,res)=>{

    User.find({}).then((users)=>{
        return res.status(200).send(users)
    })
    .catch(err=>res.status(500).send(err) )
})



module.exports = userRoutes;




