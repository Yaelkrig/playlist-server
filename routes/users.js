const express = require('express');
const router = express.Router();
const userLogic = require('../BL/userLogic')

// create user
router.post("/register", async (req, res) => {
    try {
        const accessTokenReg = await userLogic.register(req, res)
        res.status(201).json({ accessToken: accessTokenReg })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const accessToken = await userLogic.login(req, res);
        res.status(200).json(accessToken);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "internal server error" });
    }
})


module.exports = router;