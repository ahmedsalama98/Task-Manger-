const express = require('express')
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')
    // var device = require('express-device');
    // app.use(device.capture());

const port = process.env.PORT || 3000;
app.use(express.json())
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

const Task = require('../model/task')
const getUserTask = async() => {

    // const task = await Task.findById('61bb036f62af8c9e220725f2')
    // await task.populate('users')

    console.log(new Date(Date.now()).toDateString())


}

getUserTask()
app.listen(port, () => {
    console.log('running')
})