const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const slidesRoutes = require('./routes/slides');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USER + ':' + process.env.MONGO_ATLAS_PW + '@otht-jygry.mongodb.net/test?retryWrites=true')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/images', express.static('images'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/slides', slidesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;