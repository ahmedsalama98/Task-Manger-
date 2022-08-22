import express from 'express'
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')


const port = process.env.PORT ||3000;
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)



// const os = require('os')

// import os from 'os';
// console.log(os.hostname())
// console.log(os.endianness())
// console.log(os.loadavg())
// console.log(os.type())

// console.log(os.networkInterfaces())
// console.log(os.arch())










app.listen(port,()=>{
    console.log('running')
})





