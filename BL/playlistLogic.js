require('../DL/dbConnect').connect();
const playlists = require('../DL/controllers/playlistsController');
const mongoose = require('mongoose');

async function getAllPlaylists() {
    return await playlists.readAndPopulate({}, 'songs')
}
async function addNewPlaylist(playlistDetails) {
    const createPlaylist = await playlists.create(playlistDetails);
    return await playlists.read({});
}
async function deleteSongFromPlaylist(playlistId, userIdFilter) {
    const deleteSong = await playlists.delete(playlistId);
    return await playlists.readAndPopulate(userIdFilter, 'songs');
}
async function checkIfSongExistInPlaylist(playlistId, songId) {
    console.log('checking', songId);
    return await playlists.readOne({ songs: mongoose.Types.ObjectId(songId), _id: playlistId, })
}
async function addToPlaylist(req, res, songId) {
    const playlistId = req.body.playlist;
    // const alreadyExistSong = await checkIfSongExistInPlaylist(playlistId, songId);
    // console.log(alreadyExistSong);
    // if (alreadyExistSong) return res.status(409).send("already exist")
    const added = await playlists.readOneAndUpdate({ _id: playlistId }, { $push: { songs: songId } });
    return await playlists.readAndPopulate({}, 'songs')
}

module.exports = { getAllPlaylists, addNewPlaylist, deleteSongFromPlaylist, addToPlaylist }