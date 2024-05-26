const {Session} = require("../models");
const router = require("express").Router();
const middleware = require("../util/middleware");

router.delete('/', middleware.tokenExtractor, async (req, res) => {
    const session = await Session.findOne({where: {userId: req.decodedToken.id}})
    await session.destroy()
    res.json(session)
})

module.exports = router;