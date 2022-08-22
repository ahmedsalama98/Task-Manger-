const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();


taskRoutes.get('/tasks', (req,res)=>{

    return res.send('donr')
})


taskRoutes.post('/tasks', (req,res)=>{

   try{
       const body = req.body

       let task =  Task( body)
       let savedTask =  task.save()


       console.log(task)


   }catch(e){
       
   }
})





module.exports = taskRoutes;