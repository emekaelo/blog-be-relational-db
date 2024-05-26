const {ReadingList} = require("../models");
const router = require('express').Router()
const middleware = require("../util/middleware");

router.post("/", async (req, res) => {
    const readingItem = await ReadingList.create(req.body)
    res.json(readingItem)
})

router.put('/:id', middleware.tokenExtractor, async (req, res) => {
    const readingItem = await ReadingList.findByPk(req.params.id)
    if (readingItem) { // If item is found in readinglist
        if (readingItem.userId === req.decodedToken.id) {
            readingItem.read = req.body.read
            await readingItem.save()
            res.json(readingItem)
        } else {
            res.status(403).json({error: "You can't modify item not in your reading list"})
        }
    } else {
        res.status(404).end()
    }
})

module.exports = router