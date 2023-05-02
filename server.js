'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;
app.use(cors());

function Movies(id, title, release_date, poster_Path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_Path = poster_Path;
    this.overview = overview;
}

//Routes

app.get('/', homeHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/Discover', discoverHandler)
app.get('/genre', genreHandler)

//Handlers

function homeHandler(req, res) {
    res.send('welcome home');
}
function favoriteHandler(req, res) {
    res.send('my favorite');
}
async function trendingHandler(req, res) {
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    let moviesFromAPI = await axios.get(url);
    let movies = moviesFromAPI.data.results.map((element) => {
        return new Movies(element.id, element.title, element.release_date, element.poster_path, element.overview);
    })
    res.send(movies);
}
function searchHandler(req, res) {
    let search = req.query.query;
    let page = req.query.page;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}`;
    axios.get(url).then((result) => {
        res.send(result.data);
    })
}
async function discoverHandler(req, res) {
    let sorting = req.query.sort_by;
    let includeAdult = req.query.include_adult;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${sorting}.desc&include_adult=${includeAdult}`
    let discoverFromAPI = await axios.get(url);
    res.send(discoverFromAPI.data);
}
function genreHandler(req, res) {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    axios.get(url).then((result)=>{
        res.send(result.data);
    })
}

function errorHandler(req, res) {
    res.status(404).send('page not found');
}

app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})