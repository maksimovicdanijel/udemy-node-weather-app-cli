"use strict";

const axios = require('axios');
const config = require('../config');

/**
 * Fetches weather info
 * for provided latitude and longitude
 * 
 * @param  {} lat
 * @param  {} lng
 * 
 * @return Promise
 */
exports.fetchWeatherData = (lat, lng) => {
    var url = `${config.weather_api.url}${config.weather_api.apiKey}/${lat},${lng}`;
    
    return axios.get(url)
    
        .then((response) => {
            if (response.status !== 200) {
                return Promise.resolve('Unable to fetch weather info');
            }

            return {
                temperature: response.data.currently.temperature,
                feelsLike: response.data.currently.apparentTemperature
            };
        })
        
        .catch(() => {
            return Promise.reject('Unable to connect to weather api.');
        });
}