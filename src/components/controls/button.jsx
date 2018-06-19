import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ className, title, onClick }) => (
  <button
    className={className}
    onClick={onClick}
  >{title}
  </button>
);

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  onClick() {},
  title: '',
};
