const songModel = require('../models/Song');

async function read(filter, proj) {
    return await songModel.find(filter, proj);
}

async function readOne(filter, proj) {
    return await songModel.findOne(filter, proj);
}

async function create(newSong) {
    return await songModel.create(newSong);
}

async function update(id, updatePlaylist) {
    return await songModel.findByIdAndUpdate(id, updatePlaylist, { new: true })
}
async function del(id) {
    return await songModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
}

module.exports = { read, readOne, create, update, delete: del }