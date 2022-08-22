const express = require('express')

const app = express()
const userRoutes = require('../routes/user')

const port = process.env.PORT ||3000;

app.use(express.json())
// app.use(userRoutes)
app.post('/user',(req,res)=>{

    const body = req.body
    console.log(body)
    // const user = new User(body)

    // user.save()
    // .then((res)=>console.log(res,'Done'))
    // .catch(err=> console.log(err))
    res.send({name:1})
})



app.listen(port,()=>{
    console.log('running')
})





