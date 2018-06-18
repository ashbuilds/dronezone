import React from 'react';

import {
  CLIENT_SEND_CODE,
  CLIENT_ADD_DRONE,
  CLIENT_DRONE_ADDED,
  CLIENT_DISCONNECTED,
} from '../../events.json';
import Drone from '../../components/drone';
import DroneSwitch from '../../components/switch';
import './style.css';

class Zone extends React.Component {
  constructor(props) {
    super(props);
    this.tableId = 'droneTable';
    this.state = {
      on: false,
      code: '',
      joined: '',
      displayCode: false,
    };
  }


  componentDidMount() {
    const { socket } = this.props;
    socket.on('connect', () => {
      console.log('Client Connected!');
      this.setState({
        connected: 'Connected',
      });
    });
    socket.on(CLIENT_SEND_CODE, ({ code }) => {
      this.setState({
        code,
      });
    });

    socket.on(CLIENT_DRONE_ADDED, (status) => {
      this.setState({
        displayCode: false,
        on: status,
      });
    });

    socket.on(CLIENT_DISCONNECTED, () => {
      this.setState({
        displayCode: true,
        on: false,
      });
    });

    socket.emit(CLIENT_ADD_DRONE);
  }

  onToggle = () => {
    const { socket } = this.props;
    const { displayCode, on } = this.state;

    const isDisplay = !displayCode;
    if (isDisplay && on) {
      socket.disconnect();
      this.setState({
        displayCode: isDisplay,
        on: false,
      });
    } else {
      this.setState({
        displayCode: true,
      });
    }
  };

  render() {
    const { socket } = this.props;
    const {
      displayCode, on, code,
    } = this.state;
    return ([
      <div id={this.tableId} key="drone_table" className={`drone_zone ${on ? 'zone_active' : ''}`} >
        <div>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>,
      <div key="drone_container" className="drone_container">
        { displayCode && code ?
          <div className="drone_info">
            <div>{code}</div>
            <div>
              <span>Please visit : </span>
              <a href="dronezone.ashishmishra.com/admin">dronezone.ashishmishra.com/admin </a>
             and input the above code to control this drone.
            </div>
          </div> : ''}
        <Drone className={on ? 'drone_on' : ''} socket={socket} tableId={this.tableId} />
      </div>,
      <div className="switch_cover">
        <DroneSwitch isOn={on} onClick={this.onToggle} />
        { !on ? <p>TURN ON TO FLY</p> : '' }
      </div>,
    ]);
  }
}

export default Zone;
