const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/User');

// create user
router.post("/register", async (req, res) => {
    try {
        // שמירת הסיסמה מוצפנת
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        console.log('new user saved');
        const savesUser = await user.save()
        res.json(savesUser)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }

})
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: "invalid credential" });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
            res.json(accessToken)
        } else {
            res.status(400).json({ message: "invalid credential" })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})


router.get("/", async (req, res) => {
    console.log('songs 1');
    let usersList = await User.find({});
    res.send(usersList)
})
module.exports = router;