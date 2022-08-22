const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();


taskRoutes.get('/tasks', (req,res)=>{



    return res.send('donr')
})