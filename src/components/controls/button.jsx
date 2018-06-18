import React from 'react';

const Button = ({ className, title, onClick }) => (<button className={className} onClick={onClick}>{title}</button>);

export default Button;
