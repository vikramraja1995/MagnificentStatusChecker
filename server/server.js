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

const getStatus = url => axios
  .get(url)
  .then(res => ({ status: res.status, data: '' }))
  .catch((err) => {
    // If server is down, record status code 503
    const res = err.response !== undefined ? err.response : { status: 503, data: 'Service Unavailable' };
    return res;
  });

// Poll the website every 20 seconds and save status to database
setInterval(() => {
  const url = 'http://localhost:12345';
  getStatus(url).then(res => db.addStatus(url, Date.now(), res.status, res.data));
}, 20000);
/* --------------------------------------------------------------------------------------------- */

// Set up API route
app.get('/api/status', (req, res) => {
  let url = '';
  let limit = 10; // Set hard limit of statuses returned to 10

  if (typeof req.query.url === 'string') {
    url = req.query.url; // eslint-disable-line prefer-destructuring
  }
  const numLimit = Number(req.query.limit);
  // set limit to numLimit if it is a number, and is greated than 0
  if (!Number.isNaN(numLimit) && numLimit > 0) {
    limit = numLimit;
  }

  db.getStatusHistory(url, limit).then((statusHistory) => {
    const history = [];
    statusHistory.forEach((status) => {
      // If response exists, push it to history array
      if (status.response !== undefined) {
        history.push({ timestamp: status.timestamp, code: status.code, response: status.response });
      } else {
        history.push({ timestamp: status.timestamp, code: status.code });
      }
    });
    res.send(history);
  });
});
/* --------------------------------------------------------------------------------------------- */

// Listen to port specified in .env or on 3000
const port = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

module.exports = { app, getStatus };
