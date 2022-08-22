const mongoose =require('mongoose')
const validator = require('validator')
const {Schema} =mongoose;

const bcrypt = require('bcryptjs')

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
      if(val < 10){
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

usersSchema.pre('save', async function(next){

  if(this.isModified('password')){
    this.password = await bcrypt.hash( this.password , 8);


  }
  next()
})


usersSchema.statics.Auth = async (email, password)=>{

      const user = await User.findOne({email});

      if(!user){
         throw new Error('User Not Found')
      }

      console.log(user)
      const isAttempt = await bcrypt(password , user.password)
      console.log(isAttempt + 'isAttempt')
      if(!isAttempt){
        throw new Error('password is incorrect')

      }

      return user;

}

const User= mongoose.model('users', usersSchema)

module.exports = User