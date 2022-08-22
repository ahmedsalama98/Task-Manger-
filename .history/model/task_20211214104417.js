const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api');
const {Schema} = mongoose

const taskSchema = new Schema({
    title:{
        required:true,
        type:String,
        trim:true,
        
    },
    description:{
        required:true,
        type:String,
        set:async(val)=> val + ' done'

    },
    complete:{
        required:false,
        type:Boolean,
        default:false
    }

})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task;