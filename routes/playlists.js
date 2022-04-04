const router = require("./users");
const authJWT = require('../Middlewares/authJWT');
const playlistLogic = require('../BL/playlistLogic');
const mongoose = require('mongoose')

router.get("/user", async (req, res) => {
    try {
        const playlist = await playlistLogic.getAllPlaylists()
        res.status(200).json({ message: playlist });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

router.post("/newPlaylist", authJWT, async (req, res) => {
    try {
        playlistDetails = { ...req.body, createdBy: req.user._id };
        const returnPlaylists = await playlistLogic.addNewPlaylist(playlistDetails);
        res.status(200).json({ message: returnPlaylists })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})
router.put("/deleteSong", authJWT, async (req, res) => {
    try {
        const userIdFilter = { createdBy: mongoose.Types.ObjectId(req.user._id) };
        const playlist = await playlistLogic.deleteSongFromPlaylist(req.body.playlistId, userIdFilter)

        res.send(playlist);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

module.exports = router;