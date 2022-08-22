const express = require('express')
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')


const port = process.env.PORT ||3000;
console.log(Id)
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)





app.listen(port,()=>{
    console.log('running')
})





