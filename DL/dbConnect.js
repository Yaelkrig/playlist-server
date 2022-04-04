const mongoose = require('mongoose');
require('dotenv').config()

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true
        }, (err) => {
            if (err) return console.log("ERROR :", err);

            console.log('MongoDB Connection -- Ready state is:', mongoose.connection.readyState);
        })
    }
    catch (err) {
        console.log('error mongoose', err);
    }
}
