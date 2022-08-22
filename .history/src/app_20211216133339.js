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


console.log(null == true)


app.listen(port, () => {
    console.log('running')
})