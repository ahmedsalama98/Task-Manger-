const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val) {
            return validator.isEmail(val) ? true : false
        }
    },
    age: {
        type: Number,
        required: false,
        validate(val) {
            if (val < 10) {
                throw Error('age mus be greater than 10')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    tokens: [{
        required: true,
        type: String
    }],
    avatar: {
        type: Buffer
    }



})

usersSchema.pre('save', async function(next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next()
})


usersSchema.statics.Auth = async(email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        return { error: 'User Not Found' }
    }


    const isAttempt = await bcrypt.compare(password, user.password)
    if (!isAttempt) {
        return { error: 'The password is incorrect' }
    }

    return user;

}
usersSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'ahmed');
    user.tokens = user.tokens.concat(token)
    await user.save()

    return token;

}
usersSchema.methods.toJSON = function() {

    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject

}

//relation
usersSchema.virtual('tasks', { ref: 'tasks', localField: '_id', foreignField: 'owner' })


const User = mongoose.model('users', usersSchema)

module.exports = User