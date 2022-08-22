const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();


taskRoutes.get('/tasks', async(req,res)=>{


    try{

     const tasks = await Task.find({})

     if(!tasks){
         return res.status(404).send('Not Found')
     }
     return res.status(200).send(tasks)

    }catch(e){
        return res.status(500).send(e)

    }
    
})


taskRoutes.post('/tasks', (req,res)=>{


       const body = req.body

       let task =  Task( body)
       task.save()
       .then((response)=>{

          res.status(200).send(response)
       }).catch(err=> res.status(400).send(err))


       console.log(task)


})

taskRoutes.put('/tasks', async(req,res)=>{

    let updates = Object.keys(req.body),
        allowedUpdates =['description','age'],
        isValid = updates.every((el)=> allowedUpdates.includes(el));

        if(!isValid){
            return res.status(400).send('Not allowed update')
        }

    try{
        const _id = req.params.id

        const user = await User.findByIdAndUpdate(_id , req.body ,{new:true, runValidators:true})

        if(!user){
            return res.status(404).send('Not Found')
        }

      return res.status(200).send(user)


    }catch(e){
        return res.status(500).send(e)
    }
    
})







module.exports = taskRoutes;