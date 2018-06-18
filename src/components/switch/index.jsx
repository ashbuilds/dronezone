import React from 'react';

import './style.css';

const DroneSwitch = ({
  isOn, onClick,
}) => {
  return (
    <div
      role="presentation"
      className={`switch ${isOn ? 'switch_off' : ''}`}
      onClick={onClick}
    >
      {isOn ? 'OFF' : 'ON'}
    </div>
  );
};

export default DroneSwitch;
