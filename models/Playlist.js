const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    songs: {
        type: Array
    }
});
const Song = mongoose.model('Playlist', playlistSchema)
module.exports = Song;