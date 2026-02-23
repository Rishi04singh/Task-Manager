const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL)
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((err) => {
        console.log('MongoDB Conn Error...', err);
    });