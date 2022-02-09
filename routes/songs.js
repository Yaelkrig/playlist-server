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
        let id;
        console.log("++++++new song", req.user);
        const playlistId = req.body.playlist;
        const existSong = await Song.findOne({ url: req.body.url })
        console.log();
        if (existSong) {
            id = existSong._id;
        } else {
            const newSong = await new Song({ ...req.body }).save();
            id = newSong._id
        }
        console.log(playlistId);
        const addToPlaylist = await Playlist.findOneAndUpdate({ createdBy: mongoose.Types.ObjectId(req.user._id), _id: playlistId },
            { $push: { songs: id } });
        console.log(addToPlaylist);
        res.send(addToPlaylist);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

module.exports = router;