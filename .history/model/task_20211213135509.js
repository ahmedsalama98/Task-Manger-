const mongoose = require('mongoose')
const {schema} = mongoose

const taskSchema = {
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

}