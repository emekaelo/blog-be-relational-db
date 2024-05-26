const {ReadingList} = require("../models");
const router = require('express').Router()

router.post("/", async (req, res) => {
    const readingItem = await ReadingList.create(req.body)
    res.json(readingItem)
})

module.exports = router