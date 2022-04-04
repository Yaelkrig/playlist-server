const userModel = require('../models/User')

async function read(filter, proj) {
    return await userModel.find(filter, proj)
}

async function readOne(filter, proj) {
    return await userModel.findOne(filter, proj)
}

async function readOneAndPopulate(filter, proj, populate) {
    return await userModel.findOne(filter, proj).populate(populate)
}

async function create(newUser) {
    return await userModel.create(newUser)
}

async function update(id, updatedUser) {
    return await userModel.findByIdAndUpdate(id, updatedUser, { new: true })
}

async function del(id) {
    return await userModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
}

module.exports = { read, readOne, readOneAndPopulate, create, update, delete: del }