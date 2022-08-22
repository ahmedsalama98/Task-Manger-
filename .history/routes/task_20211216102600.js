const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();

const auth = require('../middleware/auth')
taskRoutes.get('/tasks', async(req, res) => {


    try {

        const tasks = await Task.find({})

        if (!tasks) {
            return res.status(404).send('Not Found')
        }
        return res.status(200).send(tasks)

    } catch (e) {
        return res.status(500).send(e)

    }

})


taskRoutes.post('/tasks', (req, res) => {


    const body = req.body

    let task = Task(body)
    task.save()
        .then((response) => {

            res.status(200).send(response)
        }).catch(err => res.status(400).send(err))


    console.log(task)


})
taskRoutes.get('/tasks/:id', async(req, res) => {


    try {
        const _id = req.params.id

        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send('Not Found')
        }
        return res.status(200).send(task)


    } catch (e) {
        return res.status(500).send(e)
    }

})

taskRoutes.put('/tasks/:id', async(req, res) => {

    let updates = Object.keys(req.body),
        allowedUpdates = ['description', 'complete'],
        isValid = updates.every((el) => allowedUpdates.includes(el));

    if (!isValid) {
        return res.status(400).send('Not allowed update')
    }

    try {
        const _id = req.params.id

        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send('Not Found')
        }

        return res.status(200).send(task)


    } catch (e) {
        return res.status(500).send(e)
    }

})
taskRoutes.delete('/tasks/:id', async(req, res) => {


    try {
        const _id = req.params.id

        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(404).send('Not Found')
        }
        return res.status(200).send(task)


    } catch (e) {
        return res.status(500).send(e)
    }

})







module.exports = taskRoutes;