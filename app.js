"use strict";

const yargs = require('yargs');

const geocode = require('./geocode');
const weatherInfo = require('./weather-info');


const argv = yargs
    .options({
        address: {
            alias: 'a',
            demand: true,
            string: true,
            describe: 'Address to fetch data for.'
        }
    })
    .help()
    .argv;

geocode.geocodeAddress(argv.address)
    .then((result) => {
        console.log('Fetching weather for: ', result.address);

        return weatherInfo.fetchWeatherData(result.latitude, result.longitude);
    })

    .then((weatherInfo) => {
        console.log(`Current temperature is ${weatherInfo.temperature}, and it feels like ${weatherInfo.feelsLike}.`);
    })

    .catch((err) => {
        console.log(err);
    });


