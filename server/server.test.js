const server = require('./server');

describe('Get webpage status', () => {
  it('should respond with 503 error if server is not running', () => {
    server.getStatus('http://localhost:49151').then((res) => {
      expect(res.status).toBe(503);
    });
  });

  // Function to call the server multiple times until the required http code is met
  const getCode = (code, trial = 0) => {
    if (trial >= 10) return;
    server.getStatus('http://localhost:12345').then((res) => {
      if (res.status !== code) {
        getCode(trial + 1);
      } else {
        expect(res.status).toBe(code);
      }
    });
  };

  it('should respond with 200 if server response is successful', () => {
    getCode(200);
  });

  it('should respond with 500 error code if server errors out', () => {
    getCode(500);
  });
});
