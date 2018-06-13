import React from 'react';
import socketIOClient from 'socket.io-client';

import './style.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: '',
      droneCode: '',
      controlOn: false,
      error: false,
    };
    this.socket = '';
  }

  componentDidMount() {
    this.socket = socketIOClient('http://192.168.1.34:3030');
    this.socket.on('connect', () => {
      console.log('Admin Connected!');
      this.setState({
        connected: 'Connected',
      });
    });
    this.socket.on('admin error', (data) => {
      this.setState({
        error: data,
      });
      console.error(data);
    });

    this.socket.on('admin drone added', (status) => {
      this.setState({
        controlOn: status,
      });
    });
  }

  onClick = () => {
    const { droneCode } = this.state;
    this.socket.emit('admin code', droneCode);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { droneCode, controlOn, error } = this.state;
    return (
      <div className="drone_admin">
        {this.state.connected}
        {!controlOn || error ?
          <div>
            <input
              name="droneCode"
              onChange={this.onChange}
              value={droneCode}
              placeholder="Drone Code(case sensitive)"
            />
            <span role="presentation" onClick={this.onClick}>Control my drone</span>
          </div> : 'Welcome to drone control!'}
      </div>
    );
  }
}

export default Admin;
