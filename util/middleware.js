const {Blog} = require("../models");
const jwt = require("jsonwebtoken");
const {SECRET} = require("./config");

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(Number(req.params.id));
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'SequelizeValidationError') { // handle individual error types
        return response.status(400).json({error: error.errors.map(error => error.message)})
        // }  else if (error.name === 'SequelizeDatabaseError') { // handle individual error types
        //     return response.status(400).json({ error: error })
    } else if (error) { // Return errors for all error types
        return response.status(400).json({error: error})
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch{
            return res.status(401).json({ error: 'token invalid' })
        }
    }  else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = {
    errorHandler,
    blogFinder,
    tokenExtractor
}