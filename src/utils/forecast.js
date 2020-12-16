const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=d843e78da75d90846094ca9263058a10&query='+latitude+','+longitude+'&units=m';
    request({ url, json : true }, (error, { body } = {}) => {
        if(error){
            callback({
                error : 'Unable to connect to weather stack'
            });
        } else if(body.error){
            callback({
                error :'Location was not found. Please try another search.'
            });
        } else {
            var {weather_descriptions, temperature, feelslike, humidity, weather_icons} = body.current;
            callback(undefined, weather_descriptions[0] + '. It is currently '+ temperature + ' degrees out. '+
            'It feels like ' + feelslike+ ' degrees out. The humidy is ' + humidity + "%", weather_icons[0]);
        }
    });
}

module.exports = forecast;