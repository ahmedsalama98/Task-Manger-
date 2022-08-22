const mongoose = require('mongoose')
const { Schema } = mongoose
const taskSchema = new Schema({


        createdAt: Number,
        updatedAt: Number,
        name: String,

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
            required: true,
            ref: 'users',
        },


    }, {
        timestamps: { currentTime: () => Date.now() }
    }

)

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task;