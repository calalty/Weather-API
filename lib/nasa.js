const fetch = require('node-fetch')
const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'

const getNasaData = async() => {
    let data = await fetch(url)

    let JSObject = await data.json()

    return JSObject
}

module.exports = {
    getNasaData
}