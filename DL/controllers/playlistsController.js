const playlistModel = require('../models/Playlist');

async function read(filter, proj) {
    return await playlistModel.find(filter, proj);
}
async function readAndPopulate(filter, pop) {
    return await playlistModel.find(filter).populate(pop);
}

async function readOne(filter, proj) {
    return await playlistModel.findOne(filter, proj);
}

async function readOneAndPopulate(filter, proj, pop) {
    return await playlistModel.findOne(filter, proj).populate(pop);
}
async function readOneAndUpdate(filter, update) {
    return await playlistModel.findOneAndUpdate(filter, update);
}

async function create(newPlaylist) {
    return await playlistModel.create(newPlaylist);
}

async function update(id, songForDelId) {
    return await playlistModel.findByIdAndUpdate(id, { $pull: { songs: songForDelId } })
}
async function del(id) {
    return await playlistModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
}

module.exports = { read, readAndPopulate, readOne, readOneAndPopulate, readOneAndUpdate, create, update, delete: del }