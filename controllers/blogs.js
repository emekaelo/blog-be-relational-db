const {Blog} = require("../models");
const middleware = require("../util/middleware");
const router = require('express').Router()

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs);
})

router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
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

router.delete("/:id", middleware.blogFinder, async (req, res) => {
    if (req.blog) {
        await req.blog.destroy()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router