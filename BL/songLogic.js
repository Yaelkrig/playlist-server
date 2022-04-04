require('../DL/dbConnect').connect();
const songs = require('../DL/controllers/songsController');

async function checkIfSongExist(url) {
    return await songs.readOne({ url: url })
}

async function addNewSong(req) {
    let id;
    const existSong = await checkIfSongExist(req.body.url);
    if (existSong) {
        return id = existSong._id;
    } else {
        const newSong = songs.create({ ...req.body })
        return id = newSong._id
    }
}

module.exports = { addNewSong }