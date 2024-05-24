const {User, Blog} = require("../models")
const router = require("express").Router();

router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {exclude: ['userId']}
        }
    })
    res.json(users)
})

router.post("/", async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put("/:username", async (req, res) => {
    const user = await User.findOne({where: {username: req.params.username}})
    if (user) {
        user.username = req.body.username
        await user.save()
        res.json(user)
    } else {
        return res.status(404).end()
    }
})

module.exports = router