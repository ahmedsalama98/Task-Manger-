const mongoose = require('mongoose')
const {Schema} = mongoose

const taskSchema = new Schema({
    name:{
        required:true,
        type:String,
        trim:true,
        
    },
    description:{
        required:true,
        type:String,

    },
    complete:{
        required:false,
        type:Boolean,
        default:false
    }

})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task;