const express = require('express')
const User =require('../model/user')
const { route } = require('./task')

const userRoutes =  express.Router()



userRoutes.post('/users',(req,res)=>{

    const body = req.body
    const user = new User(body)
    user.save()
    .then((response)=> res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
})
userRoutes.get('/users/:id', (req,res)=>{

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

userRoutes.put('/users/:id', async(req,res)=>{


    let updates = Object.keys(req.body),
        allowedUpdates =['name','age','password'],
        isValid = updates.every((el)=> allowedUpdates.includes(el));

        if(!isValid){
            return res.status(400).send('Not allowed update')
        }

    try{
        const _id = req.params.id

        // const user = await User.findByIdAndUpdate(_id , req.body ,{new:true, runValidators:true})
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send('Not Found')
        }

        updates.forEach((element)=> user[element]=req.body[element])
        await user.save();

      return res.status(200).send(user)


    }catch(e){
        return res.status(500).send(e)
    }
})


route.post('/login',(req,res)=>{

    
})
module.exports = userRoutes;




