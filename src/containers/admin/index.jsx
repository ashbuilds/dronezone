import PropTypes from 'prop-types';
import React from 'react';

import {
  ADMIN_RECEIVE_CODE,
  ADMIN_DRONE_ADDED,
  ADMIN_ERROR,
  ADMIN_DISCONNECTED,
} from '../../events.json';
import './style.css';
import Controls from '../../components/controls';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      droneCode: '',
      controlOn: false,
      error: false,
    };
    this.socket = '';
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('connect', () => {
      console.log('Admin Connected!');
    });

    socket.on(ADMIN_ERROR, (data) => {
      console.log(data);
    });

    socket.on(ADMIN_DRONE_ADDED, (status) => {
      this.setState({
        controlOn: status,
      });
    });

    socket.on(ADMIN_DISCONNECTED, () => {
      this.setState({
        controlOn: false,
      });
    });
  }

  onClick = () => {
    const { socket } = this.props;
    const { droneCode } = this.state;
    socket.emit(ADMIN_RECEIVE_CODE, droneCode);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { socket } = this.props;
    const { droneCode, controlOn, error } = this.state;
    return (
      <div className="drone_admin">
        <h2 className="title">DroneZone Dashboard</h2>
        {!controlOn || error ?
          <div className="admin_code">
            <input
              name="droneCode"
              className="admin_code_input"
              onChange={this.onChange}
              value={droneCode}
              placeholder="DRONE CODE(CASE SENSITIVE)"
            />
            <span role="presentation" onClick={this.onClick}>Control my drone</span>
          </div> : <Controls socket={socket} />}
      </div>
    );
  }
}

export default Admin;

Admin.propTypes = {
  socket: PropTypes.object.isRequired,
};
