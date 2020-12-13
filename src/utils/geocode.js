const request = require('postman-request');

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2lnaGZ5ZSIsImEiOiJja2lmY2E4cTkxajV4MnFsNjNjNWV2bmhqIn0.n-A-ADTjFKbFRxcG00l4pg&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to mapbox');
        } else if(body.features.length === 0){
            callback("Unable to find location. Please try another search");
        } else {
            var { center, place_name:location } = body.features[0];
            callback(undefined, {
                latitude : center[1], 
                longitude : center[0], 
                location
            });
        }
    });
}

module.exports = geocode;