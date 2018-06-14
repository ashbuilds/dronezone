import React from 'react';
import socketIOClient from 'socket.io-client';

import Drone from '../../components/drone';
import Switch from '../../components/switch';
import './style.css';

class Zone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
      connected: '',
      joined: '',
      left: '',
    };
  }


  componentDidMount() {
    const socket = socketIOClient('http://0.0.0.0:3030');
    // socket.
    socket.on('connect', () => {
      console.log('Client Connected!');
      this.setState({
        connected: 'Connected',
      });
    });
    socket.on('client-drone code', (data) => {
      this.setState({
        left: JSON.stringify(data),
      });
    });
    socket.on('client-drone added', (status) => {
      this.setState({
        joined: JSON.stringify(status),
        on: status,
      });
    });

    socket.on('client-admin disconnected', () => {
      console.log('Admin disconnected!!!');
    });

    socket.emit('client-add drone');
  }


  onChange = () => {
    const { on } = this.state;
    if(!on) {

      // this.setState({
      //   on: !on,
      // });
    }
  };

  render() {
    const { on } = this.state;
    return ([
      <div key="drone_table" className={`drone_zone ${on ? 'zone_active' : ''}`} >
        <div>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>,
      <div key="drone_container" className="drone_container">
        Connected: {this.state.connected}
        <br />
        Joined: {this.state.joined}
        <br />
        Left: {this.state.left}
        <Drone className={on ? 'drone_on' : ''} />
      </div>,
      <Switch key="drone_switch" className="drone_switch" onChange={this.onChange} />,
    ]);
  }
}

export default Zone;
