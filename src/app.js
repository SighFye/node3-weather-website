const path      = require('path');
const express   = require('express');
const hbs       = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define Paths For Express Configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Tom Hanson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Tom Hanson'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        helptext : 'This will be providing you with some help',
        name : 'Tom Hanson'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address for the weather search'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        else {
            forecast(latitude, longitude, (error, data) => {
                if(error) {
                    return res.send({error});
                }
                else {
                    return res.send({
                        location    : location,
                        forecast    : data,
                        address     : req.query.address,
                    }); 
                }
            });
        }
    });
 
    /*res.send({
        location    : 'Loganlea',
        forecast    : 'It is raining.',
        address     : req.query.address,
    }); */
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products    : [],
    }); 
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : "404 Error",
        errorMessage : 'Help article not found',
        name : 'Tom Hanson'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title : "404 Error",
        errorMessage : 'Page not found',
        name : 'Tom Hanson'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});