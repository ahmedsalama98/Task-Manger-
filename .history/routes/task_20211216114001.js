const express = require('express')

const Task = require('../model/task')

const taskRoutes = express.Router();

const auth = require('../middleware/auth')
taskRoutes.get('/tasks', auth, async(req, res) => {


    try {

        const tasks = await Task.find({ owner: req.user._id })

        if (!tasks) {
            return res.status(404).send('Not Found')
        }
        return res.status(200).send(tasks)

    } catch (e) {
        return res.status(500).send(e)

    }

})


taskRoutes.post('/tasks', auth, (req, res) => {


    const body = req.body

    let task = Task({...body, owner: req.user._id })
    task.save()
        .then((response) => {


            res.status(200).send(response)
        }).catch(err => res.status(400).send(err))


    console.log(task)


})
taskRoutes.get('/tasks/:id', auth, async(req, res) => {


    try {
        const _id = req.params.id

        const task = await Task.find({ _id, owner: req.user._id })

        if (!task) {

            return res.status(404).send('Not Found')
        }
        return res.status(200).send(task)


    } catch (e) {
        return res.status(500).send(e.message)
    }

})

taskRoutes.put('/tasks/:id', auth, async(req, res) => {

    let updates = Object.keys(req.body),
        allowedUpdates = ['description', 'complete'],
        isValid = updates.every((el) => allowedUpdates.includes(el));


    if (!isValid) {
        return res.status(400).send('Not allowed update')
    }

    try {


        const _id = req.params.id

        const task = await Task.findOneAndUpdate({ _id, owner: req.user._id }, req.body, { new: true, runValidators: true })

        // console.log(_id)

        // const task = await Task.find({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Not Found')
        }

        return res.status(200).send(task)


    } catch (e) {
        console.log(e)
        return res.status(500).send(e.message)
    }

})
taskRoutes.delete('/tasks/:id', async(req, res) => {


    try {
        const _id = req.params.id

        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Not Found')
        }
        return res.status(200).send(task)


    } catch (e) {
        return res.status(500).send(e)
    }

})







module.exports = taskRoutes;