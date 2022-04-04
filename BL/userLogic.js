require('../DL/dbConnect').connect();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const users = require('../DL/controllers/usersController');

async function checkIfUserExist(email) {
    return await users.readOne({ email: email })
}
async function createJWT(user) {
    return jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
}
async function register(req, res) {
    const userExist = await checkIfUserExist(req.body.email);
    if (userExist) return res.status(500).json({ message: "user already taken" })
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await users.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    })
    user.password = undefined;
    return createJWT(user)
}
async function login(req, res) {
    const user = await checkIfUserExist(req.body.email);
    if (!user) return res.status(400).json({ message: "dont exist" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
        user.password = undefined;
        return createJWT(user);
    } else {
        res.status(400).json({ message: "invalid credential" });
    }
}

module.exports = { register, login }