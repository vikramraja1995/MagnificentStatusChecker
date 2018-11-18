import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'isomorphic-fetch'; // Required for App.jsx to call fetch during tests
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should call getLatestStatus multiple times', () => {
    const mockGetLatestStatus = jest.fn(() => Promise.resolve({ error: 10, success: 10, noResponse: 10 }));
    shallow(<App getLatestStatus={mockGetLatestStatus} />);
    expect(mockGetLatestStatus).toBeCalled();
    setTimeout(() => {
      expect(mockGetLatestStatus).toBeCalledTimes(2);
    }, 20000);
  });
});
