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
            required: true,
            ref: 'users',
        },
        {
            createdAt: Number,
            updatedAt: Number,
            name: String
        }

    }, {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }

)

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task;