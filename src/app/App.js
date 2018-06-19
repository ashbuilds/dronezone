import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Routes from './routes';
import { server } from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient('http://localhost:3030'),
    };
  }

  render() {
    const { socket } = this.state;
    return (
      <BrowserRouter>
        <Routes socket={socket} />
      </BrowserRouter>
    );
  }
}

export default App;
