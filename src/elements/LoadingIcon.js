import React from 'react';
import PropTypes from 'prop-types';
import './LoadingIcon.css';

export default function LoadingIcon(props) {
  const { className } = props;
  return <span className={`LoadingIcon ${className || ''}`} />;
}

LoadingIcon.propTypes = {
  className: PropTypes.string
};
