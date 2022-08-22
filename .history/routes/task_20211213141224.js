const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();


taskRoutes.get('/tasks', (req,res)=>{

    return res.send('donr')
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





module.exports = taskRoutes;