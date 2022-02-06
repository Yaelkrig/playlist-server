const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User');

// create user
router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        // שמירת הסיסמה מוצפנת
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        console.log('new user saved');
        const savesUser = await user.save()
        res.json(savesUser)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})
router.post("/available", async (req, res) => {
    try {
        const existence = await User.findOne({ username: req.body.username });
        if (existence) return res.status(400).json({ message: "already exist" })
        res.json({ message: "available" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: "dont exist" });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            user.password = undefined;
            const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            res.json(accessToken);
        } else {
            res.status(400).json({ message: "invalid credential" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
})

router.post("/", async (req, res) => {
    if (req.body === {}) {
        console.log("out");
        res.json({ message: "gest" })
    }
    const decoded = jwt.verify(req.body.accessToken, process.env.TOKEN_SECRET);
    const userId = decoded._id
    console.log(decoded)
    console.log(userId)
    let user = await User.find({ _id: userId });
    console.log(user);
    res.json(user[0])
})

router.get("/", async (req, res) => {
    let usersList = await User.find({});
    res.send(usersList)
})
module.exports = router;