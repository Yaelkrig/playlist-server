// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./DL/dbConnect').connect();
const { songsRoute, usersRoute, playlistRoute } = require('./routes/router');

// Uses
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/songs", songsRoute);
app.use("/users", usersRoute);
app.use("/playlists", playlistRoute)


// import port from .env
const port = process.env.PORT || 5000;



// listen
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

// connection between the server and mongoose

// use router
// בקשה שתשלח בנתיב של \סונגס תיכנס לראוט



