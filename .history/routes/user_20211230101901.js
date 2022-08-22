const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')
const userRoutes = new express.Router()

const multer = require('multer')
const ApiResponse = require('../helpers/ApiResponse')

userRoutes.post('/sign-up', async(req, res) => {

    try {
        const body = req.body
        const user = new User(body)
        const token = await user.generateToken();
        return res.status(200).send(ApiResponse.sendData({ user, token }, 'Sign Up SuccessFully'))
    } catch (errors) {
        res.status(400).send(ApiResponse.sendErrors(errors, 'please check'))
    }



})
userRoutes.get('/users/:id', (req, res) => {

    const _id = req.params.id
    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    errors: { 404: 'Not Found' }
                })
            }

            res.status(200).send({
                success: true,
                data: { user }
            })
        })
        .catch(e => res.status(500).send({
            success: false,
            errors: e
        }))
})

userRoutes.get('/users', auth, (req, res) => {



    User.find({}).then((users) => {
            return res.status(200).send({
                success: true,
                data: { users }
            })
        })
        .catch(err => res.status(500).send({
            success: false,
            errors: err
        }))
})

userRoutes.put('/users/:id', async(req, res) => {


    let updates = Object.keys(req.body),
        allowedUpdates = ['name', 'age'],
        isValid = updates.every((el) => allowedUpdates.includes(el));

    if (!isValid) {
        return res.status(400).send({
            success: false,
            errors: { 400: 'Not allowed update' }
        })
    }

    try {
        const _id = req.params.id

        // const user = await User.findByIdAndUpdate(_id , req.body ,{new:true, runValidators:true})
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send('Not Found')
        }

        updates.forEach((element) => user[element] = req.body[element])
        await user.save();

        return res.status(200).send(user)


    } catch (e) {
        return res.status(500).send({
            success: false,
            errors: e
        })
    }
})


userRoutes.post('/login', async(req, res) => {


    try {

        const user = await User.Auth(req.body.email, req.body.password)

        if (user.error) {
            return res.status(401).send(ApiResponse.sendErrors(user.error, 'please check'))


        }
        const token = await user.generateToken();

        res.status(200).send(ApiResponse.sendData({ user, token }, 'Login SuccessFully'))

    } catch (errors) {
        res.status(400).send(ApiResponse.sendErrors(errors, 'please check'))
    }
})

userRoutes.get('/profile', auth, (req, res) => {
    res.status(200).send(ApiResponse.sendData({ user: req.user }, 'Done'))
})

userRoutes.put('/profile', auth, async(req, res) => {


    let updates = Object.keys(req.body),
        allowedUpdates = ['name', 'age'],
        isValid = updates.every((el) => allowedUpdates.includes(el));

    if (!isValid) {
        return res.status(400).send({
            success: false,
            errors: { 400: 'Not allowed update' }
        })
    }

    try {
        const _id = req.user._id

        // const user = await User.findByIdAndUpdate(_id , req.body ,{new:true, runValidators:true})
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send('Not Found')
        }

        updates.forEach((element) => user[element] = req.body[element])
        await user.save();

        return res.status(200).send(user)


    } catch (e) {
        return res.status(500).send({
            success: false,
            errors: e
        })
    }
})
userRoutes.delete('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(el => el != req.token)
        await req.user.save()

        res.status(200).send({ success: true, data: 'logout successfully' });
    } catch (error) {
        res.status(500).send({ success: false, errors: { 500: 'server error' } });
    }


})

userRoutes.delete('/logout-all', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send({ success: true, data: 'logout from all sessions successfully' });
    } catch (error) {
        res.status(500).send({ success: false, errors: { 500: 'server error' } });
    }


})

const uploads = multer({
    limits: 1000000,

    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {

            cb(new Error('Unvalid Image Type'))
        }

        cb(null, true)
    }

})


userRoutes.post('/upload/avatar', auth, uploads.single('avatar'), async(req, res) => {

    try {

        const user = req.user;
        user.avatar = req.file.buffer;
        await user.save();


        res.status(200).send('done')

    } catch (error) {

        res.status(500).send(error.message)
    }
})



module.exports = userRoutes;