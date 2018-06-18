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
      console.log('type : ', type);
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
  }

  debounce = (func) => {
    clearTimeout(this.debounceTime);
    this.debounceTime = setTimeout(func, 300);
  };

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
