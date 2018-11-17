require('dotenv').config(); // Load env variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/database.js');
/* --------------------------------------------------------------------------------------------- */

// Set up Express
const app = express();
app.use('/', express.static('client/dist')); // Serve front end files on root path
app.use(bodyParser.json()); // Read all API calls as JSON data
/* --------------------------------------------------------------------------------------------- */

const url = 'http://localhost:12345';
const getStatus = () => {
  // Get data from url and save to database with timestamp in Unix Time
  axios
    .get(url)
    .then(res => res)
    .catch((err) => {
      // If server is down, record status code 503
      const res = err.response !== undefined ? err.response : { status: 503, data: 'Service Unavailable' };
      return res;
    })
    .then(res => db.addStatus(url, Date.now(), res.status, res.data));
};

setInterval(getStatus, 10000); // Poll the website every 20 seconds
/* --------------------------------------------------------------------------------------------- */

// Listen to port specified in .env or on 3000
const port = process.env.SERVER_PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}...`));
