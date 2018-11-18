import React from 'react';
import { Pie } from 'react-chartjs-2';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: 0,
      success: 0,
      noResponse: 0,
    };
    this.getLatestStatus = this.getLatestStatus.bind(this);
  }

  componentDidMount() {
    this.getLatestStatus();
    setInterval(this.getLatestStatus, 20000);
  }

  getLatestStatus() {
    // Get last 3 minutes of the magnificents server's health
    fetch('/api/status?limit=15&url=http://localhost:12345')
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
        console.log(error, success, noResponse);
        this.setState({ error, success, noResponse });
      });
  }

  render() {
    const { error, success, noResponse } = this.state;
    const data = {
      labels: ['Error', 'Success', 'No Response'],
      datasets: [
        {
          data: [error, success, noResponse],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    return (
      <div>
        <h1>Health of Magnificent Server</h1>
        <Pie data={data} />
      </div>
    );
  }
}

export default App;
