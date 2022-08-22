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


const test =async ()=>{
    let x = await  bcrypt.compare( "88888888" ,"$2a$08$8MEwNW0prQyOz1pMbImneesqnF2R5DWjpMpAsfyRq3lwGfR9b78Tm")

   
    console.log(x , 'done')
}

test()




app.listen(port,()=>{
    console.log('running')
})





