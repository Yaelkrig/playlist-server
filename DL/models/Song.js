const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    playlist: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Playlist',
    },
    provider: {
        type: String
    },
});
const Song = mongoose.model('Song', songSchema)
module.exports = Song;
