import React from 'react';

const Switch = ({ className, onChange = () => {} }) => (<input className={className} onChange={onChange} type="checkbox" />);

export default Switch;

