require('../DL/dbConnect').connect();
const songs = require('../DL/controllers/songsController');
const playlists = require('../DL/controllers/playlistsController');
const songLogic = require('./songLogic')
const playlistLogic = require('./playlistLogic')

async function addNewSongToPlaylist(req, res) {
    console.log('add');
    const songId = await songLogic.addNewSong(req);
    return await playlistLogic.addToPlaylist(req, res, songId);
}

module.exports = { addNewSongToPlaylist };