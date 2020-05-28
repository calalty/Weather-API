const express = require('express');
const app = express();

require('dotenv').config();

const getWeather = require('./openWeatherMap');

app.get('/', async(req, res) => {
    
    let data = await getWeather();
    res.send(data)
});

app.get('/page2', (req, res) => {
    res.send('I am the second page')
})

app.listen(3000, ()=> {
    console.log('Listening on port 3000')
})