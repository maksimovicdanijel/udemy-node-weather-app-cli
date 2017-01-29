"use strict";

const request = require('request');
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
    var requestConfig = {
        url: `${config.weather_api.url}${config.weather_api.apiKey}/${lat},${lng}`,
        json: true
    };

    return new Promise((resolve, reject) => {
        request(requestConfig, (error, response, body) => {
            if (error) {
                return reject('Unable to connect to weather api');
            }

            if (response.statusCode === 200) {
                return resolve({
                    temperature: body.currently.temperature,
                    fillsLike: body.currently.apparentTemperature
                });
            }

            return reject('Unable to fetch weather data');
        });
    });
}