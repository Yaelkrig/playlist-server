const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User');

// create user
router.post("/register", async (req, res) => {
    try {
        const checkIfExist = await User.findOne({ username: req.body.username });
        if (checkIfExist) return res.status(500).json({ message: "user name already taken" })
        // שמירת הסיסמה מוצפנת
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        const savesUser = await user.save();
        savesUser.password = undefined;
        const accessTokenReg = jwt.sign(JSON.stringify(savesUser), process.env.TOKEN_SECRET)
        res.status(201).json({ accessToken: accessTokenReg })
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
            res.status(200).json(accessToken);
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
    const user = await User.findOne({ _id: userId });
    user.password = undefined;
    console.log(user);
    res.json(user)
})

router.get("/", async (req, res) => {
    let usersList = await User.find({});
    res.send(usersList)
})
module.exports = router;