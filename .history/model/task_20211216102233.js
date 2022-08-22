const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true,

    },
    description: {
        required: true,
        type: String,
        set: (val) => val + ' done'

    },
    completed: {
        required: false,
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    }

})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task;