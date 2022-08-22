const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();


taskRoutes.get('/tasks', (req,res)=>{

    return res.send('donr')
})


taskRoutes.post('/tasks',async (req,res)=>{

   try{
       const body = req.body

       let task =await new Task( body).save() 
       

       console.log(task)


   }catch(e){
       
   }
})





module.exports = taskRoutes;