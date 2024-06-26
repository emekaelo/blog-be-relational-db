const {Blog, User} = require("../models");
const middleware = require("../util/middleware");
const {Op} = require("sequelize");
const {sequelize} = require("../util/db");
const router = require('express').Router()

router.get("/", async (req, res) => {
    const where = {}

    if (req.query.search) {
        where[Op.or] = [
            {
                title: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            {
                author: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }
        ]
    }

    const blogs = await Blog.findAll({
        attributes: {exclude: ['userId']},
        include: {
            model: User,
            attributes: {exclude: ['createdAt', 'updatedAt']}
        },
        where,
        order: sequelize.literal('likes DESC')
    })
    res.json(blogs);
})

router.post("/", middleware.tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.put("/:id", middleware.blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.delete("/:id", middleware.blogFinder, middleware.tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (req.blog) { // If blog is found
        if (req.blog.userId === user.id) { // If logged in user created found blog
            await req.blog.destroy()
            res.json(req.blog)
        } else {
            res.status(403).json({error: "User can't delete item they did not create"});
        }
    } else {
        res.status(404).end()
    }
})

module.exports = router