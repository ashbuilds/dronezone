import React from 'react';

import Drone from '../../components/drone';
import Switch from '../../components/switch';
import './style.css';

class Zone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
    };
  }

  onChange = () => {
    const { on } = this.state;
    this.setState({
      on: !on,
    });
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
        <Drone className={on ? 'drone_on' : ''} />
      </div>,
      <Switch key="drone_switch" className="drone_switch" onChange={this.onChange} />,
    ]);
  }
}

export default Zone;
