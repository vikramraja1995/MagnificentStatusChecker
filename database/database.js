const mongoose = require('mongoose');

// Set up connection to MongoDB
mongoose.connect(
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
  { useNewUrlParser: true },
);
const db = mongoose.connection;
mongoose.Promise = Promise;
// eslint-disable-next-line no-console
db.on('error', e => console.error('Connection Error:', e));
