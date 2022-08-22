const express = require('express')
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')
const taskRoutes = require('../routes/task')


const port = process.env.PORT ||3000;
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)



const os = require('os')

// import os from "os"

console.log(os.hostname())
console.log(os.endianness())
console.log(os.loadavg())
console.log(os.type())

console.log(os.networkInterfaces())
console.log(os.arch())

let x =1
let interv = setInterval(()=>{

    x++
    if(1 > 10) clearInterval(interv)
    console.log('I Love JavaScript')
},500)







app.listen(port,()=>{
    console.log('running')
})





