// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const { connectDB } = require('./models');
const { songsRoute, usersRoute } = require('./routes/router');

// Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// import port from .env
const port = process.env.PORT || 5000;

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next();
        });
    } else {
        res.sendStatus(401)
    }
}

// listen
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

// connection between the server and mongoose
connectDB().then(() => {
    console.log(`connect to data base successfully`);
});

// use router
// בקשה שתשלח בנתיב של \סונגס תיכנס לראוט
app.use("/songs", authJWT, songsRoute)
app.use("/users", usersRoute)



