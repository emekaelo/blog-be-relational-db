const {Blog} = require("../models");

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

module.exports = {
    errorHandler,
    blogFinder
}