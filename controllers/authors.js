const {Blog} = require("../models");
const {sequelize} = require("../util/db");
const router = require('express').Router()

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: ['author', [sequelize.fn('COUNT', sequelize.col('author')), 'articles'], [sequelize.fn('SUM', sequelize.col('likes')), 'likes']], // Nice article: https://iditect.com/program-example/javascript--how-does-group-by-works-in-sequelize.html
        group: ['author'],
        order:  sequelize.literal('likes DESC')
    })
    res.json(authors)
})

module.exports = router