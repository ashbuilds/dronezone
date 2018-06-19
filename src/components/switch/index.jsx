import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const DroneSwitch = ({
  isOn, onClick,
}) => (
  <div
    role="presentation"
    className={`switch ${isOn ? 'switch_off' : ''}`}
    onClick={onClick}
  >
    {isOn ? 'OFF' : 'ON'}
  </div>
);

export default DroneSwitch;

DroneSwitch.propTypes = {
  isOn: PropTypes.bool,
  onClick: PropTypes.func,
};

DroneSwitch.defaultProps = {
  isOn: false,
  onClick() {},
};
