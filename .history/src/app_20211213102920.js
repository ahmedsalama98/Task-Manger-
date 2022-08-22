const express = require('express')
require('../db/db')
const app = express()
const userRoutes = require('../routes/user')

const port = process.env.PORT ||3000;

app.use(express.json())
app.use(userRoutes)




app.listen(port,()=>{
    console.log('running')
})





