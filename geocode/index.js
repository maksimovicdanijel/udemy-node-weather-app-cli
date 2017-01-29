const axios = require('axios');

const config = require('../config');

/**
 * 
 * 
 * @param  {} address
 */
exports.geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);

    return axios.get(`${config.geocode_api_url}json?address=${encodedAddress}`)

        .then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                return Promise.reject('Unable to find address');
            }
            
            var result = response.data.results.pop();

            return {
                address: result.formatted_address,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            };
        })

        .catch((err) => {    
            return Promise.reject('Unable to connect to geocode API.');
        })
};