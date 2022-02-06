// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./models');
const { songsRoute, usersRoute } = require('./routes/router');

// Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/songs", songsRoute)
app.use("/users", usersRoute)

// import port from .env
const port = process.env.PORT || 5000;

connectDB().then(() => {
    console.log(`connect to data base successfully`);
});

// listen
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

// connection between the server and mongoose

// use router
// בקשה שתשלח בנתיב של \סונגס תיכנס לראוט



