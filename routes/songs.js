const express = require('express');
const router = express.Router();
const authJWT = require('../middlewares/authJWT')
const generalLogic = require('../BL/generalLogic')

router.post("/add", authJWT, async (req, res) => {
    try {
        const playlists = generalLogic.addNewSongToPlaylist(req, res)
        res.send(playlists);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

module.exports = router;