const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Playlist = require('../models/Playlist')
const jwt = require("jsonwebtoken")
const authJWT = require('../middlewares/authJWT')
const mongoose = require('mongoose')

router.get("/list", async (req, res) => {
    console.log(req.user);
    const songsList = await Song.find({});
    console.log(songsList);
    if (!songsList) return res.json({ message: "there is no songs" })
    res.send(songsList);
})
router.post("/add", authJWT, async (req, res) => {
    try {
        console.log("++++++new song", req.user);
        const playlistId = req.body.playlist;
        const newSong = await new Song({ ...req.body }).save();
        console.log(playlistId);
        const addToPlaylist = await Playlist.findOneAndUpdate({ createdBy: mongoose.Types.ObjectId(req.user._id), _id: playlistId },
            { $push: { songs: newSong._id } });
        console.log(addToPlaylist);

        res.send(newSong);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})
router.delete("/:title", authJWT, async (req, res) => {
    console.log(req.body);
    const songForDelete = await Song.findOne({ title: req.params.title }).save();
    if (!songForDelete) return res.status(400)
    if (req.user.username === songForDelete.user) {
        const deletedSong = await Song.deleteOne({ title: req.params.title })
        return res.send({ message: "ok", deletedSong })
    }
    res.send(newSong);
})
module.exports = router;