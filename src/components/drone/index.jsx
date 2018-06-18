import React from 'react';

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

  debounce = (func) => {
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(func, 300);
  };

  componentDidMount() {
    const { socket, tableId } = this.props;
    if (this.drone) {
      this.setState({
        drone: new DroneHelper(tableId, this.drone),
      });
    }
    socket.on('client-drone place', (data) => {
      const { type } = data;
      if (type === 'move') {
        this.state.drone.move();
      } if (type === 'left' || type === 'right') {
        this.debounce(() => {
          this.state.drone.rotate(type);
        });
      }
    });
  }
  render() {
    const { className } = this.props;
    return (
      <div ref={(e) => { this.drone = e; }} className={`toy_drone ${className}`}>
        <span className="handle_direction" />
        <span className="board" />
      </div>);
  }
}

export default Drone;
