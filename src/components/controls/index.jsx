import React from 'react';

import Button from './button';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  onChange = ({ target: { name, value } = {} }) => {
    this.setState({
      [name]: value,
    });
  };

  onMove = () => {
    const { socket } = this.props;
    socket.emit('admin-drone place', 'move');
  };

  onLeft = () => {
    const { socket } = this.props;
    socket.emit('admin-drone place', 'left');
  };

  onRight = () => {
    const { socket } = this.props;
    socket.emit('admin-drone place', 'right');
  };

  activate = () => {
    const { active } = this.state;
    this.setState({
      active: !active,
    });
  };

  render() {
    const {
      active,
      placeX,
      placeY,
      placeF,
    } = this.state;
    return (
      <div>
        <Button title="PLACE" onClick={this.activate} />
        {
          active ?
            <div>
              <div className="place">
                PLACE
                <label htmlFor="placeX">
                  X : <input name="placeX" value={placeX} />
                </label>
                <label htmlFor="placeY">
                  Y : <input name="placeY" value={placeY} />
                </label>
                <label htmlFor="placeF">
                  F : <input name="placeF" value={placeF} />
                </label>
              </div>
              <div className="move">
                <Button title="MOVE" onClick={this.onMove} />
                <Button title="LEFT" onClick={this.onLeft} />
                <Button title="RIGHT" onClick={this.onRight} />
              </div>
            </div> : ''
        }
      </div>);
  }
}

export default Controls;
