const express = require('express')
require('dotenv').config()
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')
const cors = require('cors')
    // var device = require('express-device');
    // app.use(device.capture());

const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(taskRoutes)



// const os = require('os')

// // import os from "os"

// console.log(os.hostname())
// console.log(os.endianness())
// console.log(os.loadavg())
// console.log(os.type())

// console.log(os.networkInterfaces())
// console.log(os.arch())

// let x =1
// let interv = setInterval(()=>{

//     x++
//     if(x > 10)  return clearInterval(interv)
//     console.log('I Love JavaScript ' + x)
// },500)

// const Task = require('../model/task')
// const getUserTask = async() => {

//     const task = await Task.findById('61bb036f62af8c9e220725f2')
//     await task.populate('users')

//     console.log(task)


// }

// const validator = require('validator')

// const isPhone = validator.isMobilePhone('01025323205', 'ar-EG')

// console.log('isPhone => ' + isPhone)

// getUserTask()
app.listen(port, () => {
    console.log('running')
})