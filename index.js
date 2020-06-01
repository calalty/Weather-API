const express = require('express');
const hbs = require('express-handlebars')
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
// npm i body-parser
require('dotenv').config();

const getWeather = require('./lib/openWeatherMap');

app.use(bodyParser.urlencoded({extended: false}));
// ignore data types and make EVERYTHING a string
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.get('/', async (req, res) => {
    res.render('weather');
})

app.post('/', async (req, res) => {
    let city = req.body.city;
    let data = await getWeather(city);
    let name = data.name
    let temp = data.main.temp;
    res.render('weather', 
    {data: 
        {name, temp}
    });
})

app.listen(3000, ()=> {
    console.log('Listening on port 3000')
})