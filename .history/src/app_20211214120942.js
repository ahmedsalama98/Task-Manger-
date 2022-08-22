const express = require('express')
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')


const port = process.env.PORT ||3000;
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)
const bcrypt = require('bcryptjs')


let test =async ()=>{
    let x = await  bcrypt.compare("$2a$08$Cz44vkBab0yU2kiYoruSweYw/OMHmaW4LQtEPG3/q/mJ/AJC1jmii" , "88888888")

    return x
}

console.log(x(),'test')





app.listen(port,()=>{
    console.log('running')
})





