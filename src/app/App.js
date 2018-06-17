import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient('http://0.0.0.0:3030'),
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
