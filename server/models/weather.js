const request = require('request-promise');
require('dotenv').config();

const API_KEY = process.env.WEATHER_KEY;

class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      json: true
    }).then(function(res) {
      callback(res);
    }).catch(function(err) {
      console.log(err);
      callback({ error: 'Could not reach OpenWeatherMap API.' });
    })
  }
}

module.exports = Weather;