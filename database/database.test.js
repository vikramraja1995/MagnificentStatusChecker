require('dotenv').config(); // Load env variables from .env
const db = require('./database.js');

describe('Test database connection', () => {
  const website = 'http://localhost:12345';

  it('should return exactly 5 entrees from the database', () => {
    db.getStatusHistory(website, 5).then((res) => {
      expect(res.length).toBe(5);
    });
  });

  it('should get status history from database ordered by time', () => {
    db.getStatusHistory(website, 5).then((res) => {
      const latest = res[0].timestamp;
      const previous = res[1].timestamp;
      // Check if returned data is ordered by timestamp in descending order
      expect(latest).toBeGreaterThan(previous);
    });
  });

  it('should save status in the database', () => {
    const timestamp = Date.now();
    const code = '200';
    db.addStatus(website, timestamp, code).then((res) => {
      expect(res.timestamp).toBe(timestamp); // Check if the saved record has the correct timestamp
      db.StatusHistory.findByIdAndDelete(res.id); // Delete test record from database
    });
  });
});
