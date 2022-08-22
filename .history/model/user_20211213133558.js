const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api');
const validator = require('validator')
const {Schema} =mongoose;

const usersSchema = new Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    minLength:2
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate(val){
        return validator.isEmail(val)?true:false
    }
  },
  age:{
    type:Number,
    required:false,
    validate(val){
      if(val < 1){
         throw Error('age mus be greater than 10')
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minLength:2
  },



})

const User= mongoose.model('users', usersSchema)

module.exports = User