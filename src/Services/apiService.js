const axios = require('axios');

let base
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  base = "http://localhost:4500"
} else {
  // production code
  base = "https://www.costcoapp.com"
}

const instance = axios.create({
    baseURL: base + '/api'
  });

  module.exports = instance