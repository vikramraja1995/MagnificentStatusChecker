import React from 'react';
import { render } from 'react-dom';
import App from './App';

// Get last 3 minutes of the magnificent's server's health
const getLatestStatus = () => fetch('/api/status?limit=15&url=http://localhost:12345')
  .then(res => res.json())
  .then((res) => {
    let error = 0;
    let success = 0;
    let noResponse = 0;

    // Count number of errors, successes and no responses
    res.forEach(({ code }) => {
      if (code === 503) noResponse += 1;
      else if (code === 200) success += 1;
      else error += 1;
    });
    return { error, success, noResponse };
  })
  .catch(() => ({ error: 0, success: 0, noResponse: 0 }));
render(<App getLatestStatus={getLatestStatus} />, document.getElementById('app'));
