const express = require('express');
const hbs = require('express-handlebars')
const app = express();
const path = require('path')

require('dotenv').config();

const getWeather = require('./lib/openWeatherMap');

const getNasaData = require('./lib/nasa')

app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.get('/', async(req, res) => {
    let data = await getWeather.getWeather()
    console.log(data)
    let name = data.name
    let temp = Math.ceil(data.main.temp - 273.15)
    let description = data.weather[0].description
    let clouds = data.clouds.all
    res.render('index', {name, description, temp, clouds})
});

app.get('/nasa', async(req, res) => {
    let data = await getNasaData.getNasaData()
    let explanation = data.explanation
    console.log(data)
    res.render('nasa', {explanation})
})

app.get('/page2', (req, res) => {
    res.send('I am the second page')
})

app.listen(3000, ()=> {
    console.log('Listening on port 3000')
})