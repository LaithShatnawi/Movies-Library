'use strict'
const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors');
const data = require('./Movie data/data.json');
let arr = [];

function Movies(title, poster_Path, overview) {
    this.title = title;
    this.poster_Path = poster_Path;
    this.overview = overview;
    arr.push(this);
}
app.use(cors())

app.get('/', (req, res) => {
    new Movies(data.title, data.poster_path, data.overview);
    res.send(arr);
})
app.get('/favorite', (req, res) => {
    res.send('Welcome to Favorite Page');
})

app.use(errorHandler)

function errorHandler(req, res) {
    res.status(404).send('page not found');
}

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})