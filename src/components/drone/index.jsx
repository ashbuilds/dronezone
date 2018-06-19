import PropTypes from 'prop-types';
import React from 'react';

import { CLIENT_DRONE_PLACE } from '../../events.json';
import DroneHelper from './helper';
import './style.css';

class Drone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drone: '',
    };
    this.drone = '';
    this.debounceTime = 0;
  }

  componentDidMount() {
    const { socket, tableId } = this.props;
    if (this.drone) {
      this.setState({
        drone: new DroneHelper(tableId, this.drone),
      });
    }
    socket.on(CLIENT_DRONE_PLACE, (data) => {
      const { type } = data;
      if (type === 'move') {
        this.state.drone.move();
      } else if (type === 'left' || type === 'right') {
        this.debounce(() => {
          this.state.drone.rotate(type);
        });
      } else {
        let dataJson = type;
        try {
          dataJson = JSON.parse(type);
          this.state.drone.input(dataJson);
        } catch (e) { console.log('Error JSON parse failed!'); }
      }
    });
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.debounce(() => {
      window.location.reload();
    });
  };

  debounce = (func) => {
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(func, 300);
  };

  render() {
    const { className, isOn } = this.props;
    if (!isOn && this.drone) {
      console.log('TURNED OFF');
      this.drone.style.top = '10px';
      this.drone.style.left = '10px';
    }
    return (
      <div
        ref={(e) => { this.drone = e; }}
        className={`toy_drone ${className} ${isOn ? 'drone_active' : ''}`}
      >
        <span className="handle_direction" />
        <span className="board">
          <span />
          <span />
        </span>
      </div>);
  }
}

export default Drone;

Drone.propTypes = {
  className: PropTypes.string,
  isOn: PropTypes.bool,
  socket: PropTypes.object,
  tableId: PropTypes.string,
};

Drone.defaultProps = {
  className: '',
  isOn: false,
  socket: {},
  tableId: '',
};
