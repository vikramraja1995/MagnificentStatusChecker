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
/* --------------------------------------------------------------------------------------------- */

// Set up Schema and Model
const statusHistorySchema = new mongoose.Schema(
  {
    website: String, // Which website's status is being saved
    timestamp: String,
    code: Number,
    response: String,
  },
  // Strict is set to false as response is only recorded if a non 200 code is received
  { strict: false },
);

const StatusHistory = mongoose.model('StatusHistory', statusHistorySchema);
/* --------------------------------------------------------------------------------------------- */

// DB Querying Functions
const addStatus = (website, timestamp, code, response = '') => {
  const data = {
    website,
    timestamp,
    code,
  };
  if (response.length > 0) {
    data.response = response;
  }
  const status = new StatusHistory(data);
  return status.save();
};

// Get status from DB based on website and specified limit
const getStatus = (website, limit) => {
  console.log('test', website, limit);
  return StatusHistory.find({ website }).limit(limit);
};

/* --------------------------------------------------------------------------------------------- */

module.exports = { addStatus, getStatus };
