import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

// Write CSS styling for table
const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Head = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Data = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 0,
      success: 0,
      noResponse: 0,
    };
    this.saveStatusToState = this.saveStatusToState.bind(this);
  }

  componentDidMount() {
    this.saveStatusToState();
    setInterval(this.saveStatusToState, 20000);
  }

  saveStatusToState() {
    const { getLatestStatus } = this.props;
    getLatestStatus().then((res) => {
      this.setState(res);
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
        <Table>
          <thead>
            <Row>
              <Head>Status Type</Head>
              <Head>Count</Head>
            </Row>
          </thead>
          <tbody>
            <Row>
              <Data>Error</Data>
              <Data>{error}</Data>
            </Row>
            <Row>
              <Data>Success</Data>
              <Data>{success}</Data>
            </Row>
            <Row>
              <Data>No Response</Data>
              <Data>{noResponse}</Data>
            </Row>
          </tbody>
        </Table>

        <Pie data={data} />
      </div>
    );
  }
}

export default App;
