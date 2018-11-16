require('dotenv').config(); // Load env variables from .env
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // Initialize express
app.use('/', express.static('client/dist')); // Serve front end files on root path
app.use(bodyParser.json()); // Read all API calls as JSON data

const port = process.env.SERVER_PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}...`));
