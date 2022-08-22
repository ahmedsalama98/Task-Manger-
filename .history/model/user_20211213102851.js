
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