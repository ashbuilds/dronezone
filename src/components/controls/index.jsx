import React from 'react';
import PropTypes from 'prop-types';

import { ADMIN_DRONE_PLACE } from '../../events.json';
import './style.css';
import Button from './button';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeX: '',
      placeY: '',
      placeF: '',
      placeFOptions: [
        {
          value: 1,
          title: 'NORTH',
        },
        {
          value: -90,
          title: 'WEST',
        }, {
          value: 90,
          title: 'EAST',
        },
        {
          value: 180,
          title: 'SOUTH',
        },
      ],
    };
  }

  onChange = ({ target: { name, value } = {} }) => {
    this.setState({
      [name]: value,
    });
  };

  onMove = () => {
    const { socket } = this.props;
    socket.emit(ADMIN_DRONE_PLACE, 'move');
  };

  onLeft = () => {
    const { socket } = this.props;
    socket.emit(ADMIN_DRONE_PLACE, 'left');
  };

  onPlace = () => {
    const { socket } = this.props;
    const { placeX: x = 0, placeY: y = 0, placeF: f = 1 } = this.state;
    socket.emit(ADMIN_DRONE_PLACE, JSON.stringify({
      x,
      y,
      f,
    }));
  };

  onRight = () => {
    const { socket } = this.props;
    socket.emit('admin-drone place', 'right');
  };

  render() {
    const {
      placeX,
      placeY,
      placeF,
      placeFOptions,
    } = this.state;
    return (<div key="dashboard_panel" className="dashboard_panel">
      <div className="place">
        <label htmlFor="placeX">
          <input
            name="placeX"
            placeholder="Type X (left)"
            value={placeX}
            onChange={this.onChange}
          />
        </label>
        <label htmlFor="placeY">
          <input
            name="placeY"
            placeholder="Type Y (top)"
            value={placeY}
            onChange={this.onChange}
          />
        </label>
        <label htmlFor="placeF">
          <select
            name="placeF"
            value={placeF}
            onChange={this.onChange}
          ><option value={0}>Select Facing</option>
            {placeFOptions.map(item => <option value={item.value}>{item.title}</option>)}
          </select>
        </label>
        <Button className="drone_place" title="PLACE" onClick={this.onPlace} />
      </div>
      <hr />
      <div className="move">
        <Button title="LEFT" onClick={this.onLeft} />
        <Button title="MOVE" onClick={this.onMove} />
        <Button title="RIGHT" onClick={this.onRight} />
      </div>
    </div>);
  }
}

export default Controls;

Controls.propTypes = {
  socket: PropTypes.any.isRequired,
};
