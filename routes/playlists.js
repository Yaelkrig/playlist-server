const router = require("./users");
const authJWT = require('../middlewares/authJWT')
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose')

router.get("/uesr", authJWT, async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("^^^^^^^", req.user);
        const playlist = await Playlist.find({ createdBy: mongoose.Types.ObjectId(userId) }).populate(
            "songs"
        );
        console.log({ playlist });
        res.status(200).json({ message: playlist });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

router.post("/newSong", authJWT, async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.idPlaylist;
        const songId = req.body.songId;
        const addToPlaylist = await Playlist.findOne({ createdBy: req.user, _id: id })
        addToPlaylist.songs.push(songId);
        res.status(200).json({ message: "succied" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
})
router.post("/newPlaylist", authJWT, async (req, res) => {
    try {
        console.log('user', req.user);
        playlistDetails = { ...req.body, createdBy: req.user._id };
        console.log(playlistDetails);
        const newPlaylist = await Playlist({ ...playlistDetails }).save();
        res.status(200).json({ message: `saved ${newPlaylist}` })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})
module.exports = router;