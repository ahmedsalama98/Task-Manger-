const jwt = require('jsonwebtoken')
const ApiResponse = require('../helpers/ApiResponse')
const User = require('../model/user')


const auth = async(req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '')

        const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

        const user = await User.findOne({ _id: decode._id, tokens: token })

        if (!user) {
            return res.status(401).send({ error: true, message: 'Please Authenticate' })
        }
        req.user = user;
        req.token = token;
        next()
    } catch (e) {

        res.status(401).send(ApiResponse.sendErrors({ errors: 'UnAuthorized' }, 'Please Authenticate'))

    }
}

module.exports = auth;