const express = require('express');
const router = express.Router();
const Song = require('../models/Song')
const jwt = require("jsonwebtoken")


// יישלח את מי שינותב ככה
// "/songs"
router.get("/", async (req, res) => {
    let songsList = await Song.find({});
    res.send(songsList)
})
router.post("/", async (req, res) => {
    console.log(req.body);
    let newSong = await new Song({ ...req.body }).save();
    res.send(newSong)
})
router.delete("/:title", authJWT, async (req, res) => {
    console.log(req.body);
    let songForDelete = await Song.findOne({ title: req.params.title }).save();
    if (!songForDelete) return res.status(400)
    if (req.user.username === songForDelete.user) {
        const deletedSong = await Song.deleteOne({ title: req.params.title })
        return res.send({ message: "ok", deletedSong })
    }
    res.send(newSong)
})
module.exports = router;