const Axios = require('axios');
const https = require('https');
require('dotenv').config();

const baseURL = process.env.BASE_URL;

module.exports = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL,
  maxContentLength: Infinity,
  maxBodyLength: Infinity
});
